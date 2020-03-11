#################################################
# BUILDER  PYTHON 3.7.5 ON MACHINE UBUNTU 19.10 #---------------------------------------------------
#################################################

# pull official base image
FROM ubuntu:19.10 as builder


# install system utilities
ENV DEBIAN_FRONTEND noninteractive
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
# install SQL Server drivers
RUN apt-get update && apt-get install -y --fix-missing \
  python3-dev python3-pip python3-wheel \
  # clean
  && apt-get autoremove -y\
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*


# install python env
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN python3 --version && python3 -m pip --version \
  && python3 -m pip install --upgrade pip wheel
# lint
# RUN python3 -m pip install --upgrade flake8 black

# install dependencies
WORKDIR /complier
COPY ./Ubuntu_reqs.txt ./reqs.txt
RUN python3 -m pip wheel --no-cache-dir --no-deps --wheel-dir /complier/wheels -r reqs.txt
#RUN python3 -m pip wheel --wheel-dir /complier/wheels -r reqs.txt


# check lint
# COPY . .
# RUN flake8 --ignore=E501,F401 . && black --check .


#########
# FINAL #----------------------------------------------------------------------------------
#########

# pull official base image
FROM ubuntu:19.10


ENV DEBIAN_FRONTEND noninteractive
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
RUN apt-get update && apt-get install -y --fix-missing --no-install-recommends \
  python3-dev ca-certificates openssl libssl-dev \
  # package for complier
  python3-pip python3-wheel \
  curl gnupg apt-utils apt-transport-https build-essential debconf-utils \
  && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
  && curl https://packages.microsoft.com/config/ubuntu/19.10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
  # install odbc driver
  && apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
  && apt-get install -y --fix-missing --no-install-recommends \
  unixodbc-dev python3-pyodbc \
  # update locale-gen for mssql
  # locales \
  #&& echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  #&& locale-gen \
  # update openssl to ssl1.1 for pyodbc
  && chmod +rwx /etc/ssl/openssl.cnf \
  && sed -i 's/TLSv1.2/TLSv1/g' /etc/ssl/openssl.cnf \
  && sed -i 's/SECLEVEL=2/SECLEVEL=1/g' /etc/ssl/openssl.cnf \
  # clean
  && apt-get autoremove -y \
  && apt-get clean

# create system user=pkh, group_user=webapp
ENV APP_HOME=/home/web
RUN addgroup --system webapp \
  && adduser --system --home $APP_HOME --shell /bin/false --ingroup webapp --disabled-password --disabled-login pkh

# install webapp
WORKDIR $APP_HOME
COPY --from=builder /complier/wheels /wheels
COPY --from=builder /complier/reqs.txt .
#ENV PYTHONDONTWRITEBYTECODE 1
#ENV PYTHONUNBUFFERED 1
RUN python3 -m pip install --upgrade pip wheel \
  && python3 -m pip install --no-cache /wheels/* \
  # clean all no need
  && rm -rf /wheels \
  && rm -rf /root/.cache/pip/* \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /tmp/* \
  && rm -rf /var/tmp/* \
  && apt-get purge -y \
  python3-pip python3-wheel \
  curl gnupg apt-utils apt-transport-https build-essential debconf-utils \
  && apt-get autoremove -y \
  && apt-get clean

# copy project
COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R pkh:webapp $APP_HOME

# change to the app user
USER pkh

# run one server
ARG APP_PORT=8888
ENV APP_PORT $APP_PORT
EXPOSE $APP_PORT
ENTRYPOINT python3 runserver.py \
  --db_user 'pkh.web' \
  --db_pwd 'w3b@pkh2019' \
  --db_host '192.168.24.4:1433' \
  --db_name 'PKHData' \
  --port $APP_PORT