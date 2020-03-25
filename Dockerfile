FROM node:12-alpine as base

WORKDIR /app
COPY package.json .
RUN echo http://mirrors.aliyun.com/alpine/v3.6/main/ > /etc/apk/repositories && \
        echo http://mirrors.aliyun.com/alpine/v3.6/community/ >> /etc/apk/repositories && \
	apk update
RUN npm install --production --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/mirrors/node --build-from-source

FROM node:12-alpine as prod
RUN echo http://mirrors.aliyun.com/alpine/v3.6/main/ > /etc/apk/repositories && \
	echo http://mirrors.aliyun.com/alpine/v3.6/community/ >> /etc/apk/repositories && \
	apk update && apk add ca-certificates && \
	apk add -U tzdata && \
	cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
	echo "Asia/Shanghai" > /etc/timezone
ENV TZ=Asia/Shanghai

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json .
COPY src ./src
COPY tsconfig.json ./
COPY config ./config

CMD ["npm","start"]
EXPOSE 3000
