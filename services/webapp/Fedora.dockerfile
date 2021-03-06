#################################################
# BUILDER  PYTHON 3.8.2 ON MACHINE FEDORA 32    #-----------------------------------------------------------------------
#################################################

# pull official base image
FROM fedora:32 as builder


# install system dependencies
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
RUN dnf -y upgrade && dnf install --nodocs -y \
  python3-devel \
  && dnf clean all -y

RUN python -m pip install --upgrade pip wheel \
  && python --version \
  && python -m pip --version
# lint
# && python -m pip install --upgrade flake8 black

# build python app
WORKDIR /complier
COPY ./Fedora_reqs.txt ./reqs.txt
RUN python -m pip wheel --no-cache-dir --no-deps --wheel-dir /complier/wheels -r reqs.txt
#RUN python3 -m pip wheel --wheel-dir /complier/wheels -r reqs.txt


# check lint
# COPY . .
# RUN flake8 --ignore=E501,F401 . && black --check .


#########
# FINAL #----------------------------------------------------------------------------------
#########

# pull official base image
FROM fedora:32


# install system dependencies
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
RUN curl https://packages.microsoft.com/config/rhel/8/prod.repo > /etc/yum.repos.d/mssql-release.repo \
  && dnf remove unixODBC-utf16 unixODBC-utf16-devel \
  && dnf -y upgrade && ACCEPT_EULA=Y dnf install --nodocs -y msodbcsql17 \
  && dnf install --nodocs -y python3-devel python3-pyodbc \
  && dnf clean all -y

# create system user=pkh, group_user=webapp
ENV APP_HOME=/home/web
RUN groupadd -r webapp \
  && useradd -r -m -d $APP_HOME -s /bin/false -g webapp pkh

# install webapp
WORKDIR $APP_HOME
COPY --from=builder /complier/wheels /wheels
COPY --from=builder /complier/reqs.txt .
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1
RUN python -m pip install --upgrade pip wheel \
  && python -m pip install --no-cache /wheels/* \
  # clean all no need
  # && dnf remove -y python3-pip python3-wheel \
  && dnf clean all -y \
  && rm -rf /wheels \
  && rm -rf /root/.cache/pip/* \
  && rm -rf /tmp/* \
  && rm -rf /var/tmp/*

# copy project
COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R pkh:webapp $APP_HOME

# change to the app user
USER pkh

# run entrypoint.prod.sh
# ENTRYPOINT ["/home/app/web/entrypoint.prod.sh"]

# run one server
ARG APP_PORT=8888
ENV APP_PORT $APP_PORT
EXPOSE $APP_PORT
ENTRYPOINT python runserver.py \
  --db_user 'pkh.web' \
  --db_pwd 'w3b@pkh2019' \
  --db_host '192.168.24.4:1433' \
  --db_name 'PKHData' \
  --port $APP_PORT