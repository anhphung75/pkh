FROM ubuntu:18.04

# install dependencies os
ENV DEBIAN_FRONTEND noninteractive
ENV LANG C.UTF-8
RUN apt-get update && apt-get -y install \
  g++ unixodbc-dev curl apt-utils\
  make build-essential libssl-dev zlib1g-dev libbz2-dev \
  libreadline-dev libsqlite3-dev libncurses5-dev libncursesw5-dev \
  xz-utils tk-dev libffi-dev liblzma-dev python-openssl git

# add ODBC repo
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
# pyodbc


RUN apt-get update
RUN ACCEPT_EULA=Y apt-get -y install msodbcsql17
RUN apt-get -y install locales \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen \
  && rm -rf /var/lib/apt/lists/*

# pyenv enviroment
ENV LANG en_US.utf8
ENV PYENV_ROOT /home/.pyenv
ENV PATH $PYENV_ROOT/shims:$PYENV_ROOT/bin:$PATH
RUN git clone https://github.com/pyenv/pyenv.git $PYENV_ROOT
RUN pyenv install 3.8.1
RUN pyenv global 3.8.1

# python environment
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN pip install --upgrade pip wheel setuptools
COPY ./requirements.txt /usr/src/app/requirements.txt

WORKDIR /usr/src/app
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app/

EXPOSE 8888 443

# run entrypoint.sh
# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
#ENTRYPOINT [ "python", "webapp.py" ] 
