!#/bin/sh
docker run -p 8080:8080 -p 50000:50000 --restart=on-failure -d -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk17