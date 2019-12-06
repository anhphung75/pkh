# pull official base image
FROM python:3.8-buster

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# adding custom MS repository
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
  && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
  # install dependencies os
  && apt-get update \
  && apt-get install -y apt-utils g++ python3-dev unixodbc-dev libffi-dev \
  # install SQL Server drivers
  && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
  # install necessary locales
  && apt-get install -y locales \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen \
  # && rm -rf /var/lib/apt/lists/*
  # install dependencies python
  && pip install --upgrade pip

COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app/

# run entrypoint.sh
# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
