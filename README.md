# microservices-basics

This repository is to learn and explore microservices using Node js with typescript along with deployment using docker and kubernetes.
In this repository main branch is itself a basic microservice based app. Second branch is another microservice based app named as Ticketing.



# Blog app
  To run this app you should have docker and minikube(minikube is local Kubernetes) installed on your system. To create kubernetes objects(pods,             deployments, services) by yourself using kubectl(command line tool to interact with kubernetes) navigate to infra/k8s folder using command line
  and type command kubectl 'kubectl apply -f file_name' (file_name is the name of corresponding file you want to create objects from).
  This command will create the objects that are configured in the file.
  If you don't want to create kubernetes objects your self, just install the skaffold(command line tool) and navigate to where skaffold.yaml file is
  located and run the command 'skaffold dev' this  will automatically create all the kubernete objects that are configured in infra/k8s/*.yaml files. 
  
  Steps to run the app locally.
    1.  clone the repo
    2.  go to every folder listed in repo and run npm install


# Ticketing app
