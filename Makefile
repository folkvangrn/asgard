TAG = ${TAG_NAME}

build:
	npm run build

build-docker:
	docker build -t asgard:${TAG} --label asgard .

publish-docker:
	docker image tag asgard:${TAG} docker.io/nixen/asgard:${TAG}
	docker push nixen/asgard:${TAG}

run:
	npm run dev

install:
	npm install