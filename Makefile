
build:
	docker build -t apsgangwar/chat_db:latest -f chat_db/Dockerfile chat_db/
	docker build -t apsgangwar/chat_svc:latest -f chat_svc/Dockerfile chat_svc/
	docker build -t apsgangwar/chat_front:latest -f chat_front/Dockerfile chat_front/

deploy:
	helm upgrade --install chat-front ./helm_chart/chat_front/
	helm upgrade --install chat-svc ./helm_chart/chat_svc/
	helm upgrade --install chat-db ./helm_chart/chat_db/