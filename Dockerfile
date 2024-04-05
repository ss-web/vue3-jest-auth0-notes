# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.19.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app

ENV LANG C.UTF-8
ENV HOST '0.0.0.0'
ENV PORT 4173

COPY . /usr/src/app

EXPOSE 4173

RUN set -ex \
	&& rm -rf node_modules package-lock.json \
	&& npm install \
	&& npm run build

CMD ["sh", "-c", "npm run preview"]
