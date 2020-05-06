#################################################
# BUILDER  Nodejs 13, Svelte 3. on machine FEDORA 32    #-----------------------------------------------------------------------
#################################################

# pull official base image
FROM fedora:32 as builder


# install system dependencies
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
RUN dnf -y upgrade && dnf install --nodocs -y \
  git nodejs npm \
  # repair node path outdate
  #&& ln -s /usr/bin/nodejs /usr/bin/node \
  && dnf clean all -y \
  # view result
  && node --version


# build svelte app
WORKDIR /complier
RUN git clone https://github.com/sveltejs/svelte.git
COPY register.js rollup.config.js package*.json ./
RUN npm update --save/--save-dev && npm install && npm audit fix
COPY ./src ./src
RUN npm run build




#########
# FINAL #----------------------------------------------------------------------------------
#########

# pull official base image
FROM fedora:32


# install system dependencies
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
RUN dnf -y upgrade && dnf install --nodocs -y \
  nodejs npm \
  # repair node path outdate
  #&& ln -s /usr/bin/nodejs /usr/bin/node \
  && dnf clean all -y \
  # view result
  && node --version

# create system user=pkh, group_user=webapp
ENV APP_HOME=/home/web
RUN groupadd -r webapp \
  && useradd -r -m -d $APP_HOME -s /bin/false -g webapp pkh

# install webapp
WORKDIR $APP_HOME
COPY --from=builder /complier/register.js .
COPY --from=builder /complier/rollup.config.js .
COPY --from=builder /complier/package*.json .
RUN npm update --save/--save-dev && npm install && npm audit fix

# copy project
COPY --from=builder /complier/public /public
COPY --from=builder /complier/scr /scr
#COPY . $APP_HOME

# chown all the files to the app user
RUN chown -R pkh:webapp $APP_HOME

# change to the app user
USER pkh

# run entrypoint.prod.sh
# ENTRYPOINT ["/home/app/web/entrypoint.prod.sh"]

# run one server
ARG APP_PORT=5000
ENV APP_PORT $APP_PORT
EXPOSE $APP_PORT
ENTRYPOINT npm run dev