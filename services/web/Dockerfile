# pull official base image
FROM python:3.8.0


ENV DEBIAN_FRONTEND=noninteractive
# adding custom MS repository
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/19.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
# install dependencies os
RUN apt-get update && apt-get -y install \
  g++ unixodbc-dev

RUN ACCEPT_EULA=Y apt-get -y install msodbcsql17
RUN apt-get -y install locales \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen \
  && rm -rf /var/lib/apt/lists/*

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
