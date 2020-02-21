###########
# BUILDER #
###########
# pull official base image
FROM python:3.8.1-buster as builder

# set work directory
WORKDIR /usr/src/app

# install system utilities
ENV DEBIAN_FRONTEND noninteractive
ENV LANG C.UTF-8
RUN apt-get update && apt-get install -y \
  curl apt-utils apt-transport-https debconf-utils \
  gcc build-essential libffi-dev \
  unixodbc-dev g++

# install SQL Server drivers
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17

# install libssl
RUN apt-get update && apt-get install -y libssl-dev

# install necessary locales
RUN apt-get update && apt-get install -y locales \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

# clear apt-get cache
RUN rm -rf /var/lib/apt/lists/*

# lint
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN pip install --upgrade pip
RUN pip install flake8 black
COPY . /usr/src/app/
RUN flake8 --ignore=E501,F401 .
RUN black --check .

# install dependencies
COPY ./requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt



#########
# FINAL #
#########
# pull official base image
FROM python:3.8.1-buster

# create directory for the app user
RUN mkdir -p /home/app

# create the app user
RUN addgroup -S app && adduser -S app -G app

# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/web
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# install system dependencies
#RUN apk update && apk add libpq

# install python app
COPY --from=builder /usr/src/app/wheels /wheels
COPY --from=builder /usr/src/app/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache /wheels/*

# copy project
COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R app:app $APP_HOME

# change to the app user
USER app

# run entrypoint.prod.sh
ENTRYPOINT ["/home/app/web/entrypoint.prod.sh"]


# run server
ENV APP_PORT=8000
EXPOSE 443 $APP_PORT
ENTRYPOINT ["python", "webapp.py", "--port:$APP_PORT"]
