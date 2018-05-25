NAME=klg-starter
REGISTRY=r.p.cailve.cn
TAG = beta

build:
	echo building ${NAME}:${TAG}
	cp docker/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	rm Dockerfile
	docker push "${REGISTRY}/${NAME}:${TAG}"


