FROM python:3.6.4-alpine3.7

RUN apk add --update curl gcc g++ git libffi-dev openssl-dev python3-dev build-base linux-headers \
    && rm -rf /var/cache/apk/*
RUN ln -s /usr/include/locale.h /usr/include/xlocale.h

ENV PYTHONUNBUFFERED=1 APP_HOME=/microservice/ CONFIGMAP_FILE="${APP_HOME}config-docker.yml"

RUN mkdir $APP_HOME && adduser -S -D -H python && chown -R python $APP_HOME
WORKDIR $APP_HOME

RUN pip install --upgrade pip
ADD requirement*.txt $APP_HOME
RUN pip install -r requirements-docker.txt

ADD . $APP_HOME

EXPOSE 8080
USER python

ENTRYPOINT ["python", "manage.py"]