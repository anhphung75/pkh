# pull official base image
FROM python:3.7.5

ADD ./ttdl/odbcinst.ini /etc/odbcinst.ini
ADD ./ttdl/odbc.ini /etc/odbc.ini
ENV DEBIAN_FRONTEND=noninteractive
# adding custom MS repository
#RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
#RUN curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list
# install dependencies os
RUN apt-get update && apt-get -y install \
  curl apt-utils apt-transport-https build-essential python3-dev \
  debconf-utils gcc g++ libffi-dev iputils-ping \
  unixodbc unixodbc-dev odbcinst \
  tdsodbc freetds-dev freetds-bin freetds-common

#RUN ACCEPT_EULA=Y apt-get -y install msodbcsql17
#RUN apt-get -y install locales \
#  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
#  && locale-gen
# && rm -rf /var/lib/apt/lists/*

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies python
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt

WORKDIR /usr/src/app
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app/

EXPOSE 8888

# run entrypoint.sh
# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
