NAME=klg-starter
REGISTRY=r.p.cailve.cn
TAG = beta

build:
	echo building ${NAME}:${TAG}
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker push "${REGISTRY}/${NAME}:${TAG}"


