
build:
	docker build -t chat_db:v1 -f chat_db/Dockerfile chat_db/
	docker build -t chat_svc:v1 -f chat_svc/Dockerfile chat_svc/
	docker build -t chat_front:v1 -f chat_front/Dockerfile chat_front/

deploy:
	helm upgrade --install chat-front ./helm_chart/chat_front/
	helm upgrade --install chat-svc ./helm_chart/chat_svc/
	helm upgrade --install chat-db ./helm_chart/chat_db/