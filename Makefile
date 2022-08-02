all: build push deploy

build:
	docker build -t apsgangwar/chat_db:latest ./chat_db/
	docker build -t apsgangwar/chat_svc:latest ./chat_svc/
	docker build -t apsgangwar/chat_front:latest ./chat_front/

push:
	docker push apsgangwar/chat_db
	docker push apsgangwar/chat_svc
	docker push apsgangwar/chat_front

deploy:
	helm upgrade chating-app ./helm_chart/ --install

clean:
	helm uninstall chating-app