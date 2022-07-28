# Chat microservices

The objetive of this project is to show a real example of our library
[PyMS](https://github.com/python-microservices/pyms),
[the template](https://github.com/python-microservices/microservices-template)
and the
[scaffold](https://github.com/python-microservices/microservices-scaffold).

The tutorial of "how to create a cluster" is based of this
[bitnami tutorial](https://docs.bitnami.com/kubernetes/get-started-kubernetes/)

# Chating-App

This is a example of 3 microservices and a database working in a Kubernetes
cluster.

- **chat_front:** Simple webpage that sends and receives messages from chat_svc
  through socket io
- **chat_svc:** Receives messages from chat_front and sends these messages to
  chat_db to store this information
- **chat_db:** Receives data from chat_svc and stores this information in a
  SQLite DB.

## Architecture

![](docs/imgs/architecture.png)

## Steps

1. Create the docker images:

```bash
docker build -t chat_db:v1 ./chat_db/
docker build -t chat_svc:v1 ./chat_svc/
docker build -t chat_front:v1 ./chat_front/
```

2. Update the clusterIp in helm chart Values.yaml

3. Check your helm chart:

```bash
helm upgrade --dry-run --install chating-app ./helm_chart/
```

4. Install the helm chart:

```bash
helm upgrade --install chating-app ./helm_chart/
```

5. Verify that all pods are OK:

```bash
kubectl get pods
```

![](docs/imgs/pods.png)

5. Open the clusterIP:front_svc_port and see the magic! ;)

![](docs/imgs/front_ms.png)
