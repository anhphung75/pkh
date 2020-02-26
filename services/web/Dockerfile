
FROM python:3.8.1-buster

# install system utilities
ENV DEBIAN_FRONTEND noninteractive
ENV LANG C.UTF-8
RUN apt-get update && apt-get install -y --fix-missing --no-install-recommends \
  curl make git ca-certificates openssl libssl-dev \
  apt-utils apt-transport-https build-essential debconf-utils \
  gnupg gcc libffi-dev g++ \
  unixodbc-dev

# install SQL Server drivers
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17
# install necessary locales for mssql
RUN apt-get update && apt-get install -y locales \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

# update openssl to ssl1.1
RUN chmod +rwx /etc/ssl/openssl.cnf
RUN sed -i 's/TLSv1.2/TLSv1/g' /etc/ssl/openssl.cnf
RUN sed -i 's/SECLEVEL=2/SECLEVEL=1/g' /etc/ssl/openssl.cnf

# install webapp
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN pip install --upgrade pip wheel setuptools

# create directory for the app user
ENV HOME=/home/app
#RUN mkdir -p $HOME
ENV APP_HOME=/home/app/web
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# clear apt-get cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# copy project
COPY . $APP_HOME

# chown all the files to the app user
# create in system the webapp group user
RUN addgroup --system webapp 
RUN adduser --system --ingroup webapp pkh
RUN chown -R pkh:webapp $APP_HOME

# change to the app user
USER pkh

# run entrypoint.prod.sh
# ENTRYPOINT ["/home/app/web/entrypoint.prod.sh"]

# run server
ENV APP_PORT=8000
EXPOSE 443 $APP_PORT
ENTRYPOINT python webapp.py --port=$APP_PORT