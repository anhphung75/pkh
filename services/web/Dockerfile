#################################################
# BUILDER  PYTHON 3.8.2 ON MACHINE UBUNTU 18.04 #-----------------------------------------------------------------------
#################################################

# pull official base image
FROM ubuntu:18.04 as builder


# install python 3.8.2
ENV DEBIAN_FRONTEND noninteractive
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHON_VERSION 3.8
RUN apt-get update && apt-get install -y software-properties-common wget
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y --no-install-recommends --fix-missing \
  "python$PYTHON_VERSION-dev" "python$PYTHON_VERSION-distutils" \
  # clean apt-get cache
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && apt-get autoremove -y\
  && apt-get clean \
  # check version
  && cd /usr/bin/ \
  && ln -s "/usr/bin/python$PYTHON_VERSION" python \
  && python --version

# install latest pip
ENV PYTHON_PIP_VERSION 20.0.2
ENV PYTHON_GET_PIP_URL https://github.com/pypa/get-pip/raw/d59197a3c169cef378a22428a3fa99d33e080a5d/get-pip.py
ENV PYTHON_GET_PIP_SHA256 421ac1d44c0cf9730a088e337867d974b91bdce4ea2636099275071878cc189e
RUN set -ex; \
  wget -O get-pip.py "$PYTHON_GET_PIP_URL"; \
  echo "$PYTHON_GET_PIP_SHA256 *get-pip.py" | sha256sum --check --strict -; \
  python get-pip.py --disable-pip-version-check --no-cache-dir "pip==$PYTHON_PIP_VERSION"; \
  # clear file no need
  find /usr/local -depth \
  \( \
  \( -type d -a \( -name test -o -name tests -o -name idle_test \) \) \
  -o \
  \( -type f -a \( -name '*.pyc' -o -name '*.pyo' \) \) \
  \) -exec rm -rf '{}' +; \
  rm -f get-pip.py; \
  # check version
  pip --version;


RUN python -m pip install -U pip wheel \
  && python --version \
  && pip --version


WORKDIR /usr/local/bin/
RUN ls -lrth * 

WORKDIR /usr/local/lib/
RUN ls -lrth * 