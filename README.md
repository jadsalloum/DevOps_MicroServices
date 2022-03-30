# F21AO-DevOps
Repository for DevOps Course Works

# Docker
# docker build -t node-f21ao-test .


# docker run -it -p 80:5000 node-f21ao-test

# docker container ls

docker images
docker ps

# Create and run docker containers

docker-compose build
docker-compose up




kubectl run nginx --image=nginx --restart=Never
kubectl run nodejs --image=nodejs --restart=Never


====================



kubectl delete deployments apigateway
kubectl delete deployments authentication
kubectl delete deployments patients
kubectl delete deployments appointments
kubectl delete deployments users




>  

kubectl apply -f deployment.yaml
kubectl apply -f services.yaml

### EXPOSE SERVICES
kubectl expose deployment apigateway --type=NodePort --name=apigateway-service
kubectl expose deployment authentication --type=NodePort --name=authentication-service
kubectl expose deployment patients --type=NodePort --name=patients-service
kubectl expose deployment appointments --type=NodePort --name=appointments-service
kubectl expose deployment users --type=NodePort --name=users-service


kubectl get pods
kubectl get services

kubectl get deployments 

kubectl describe deployments apigateway
 kubectl describe deployment apigateway


