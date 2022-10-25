FROM openjdk:11-jre-slim-buster

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} /usr/src/myapp/api-cursos.jar 

WORKDIR /usr/src/myapp

RUN rm -f /etc/localtime && \
    ln -s /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

CMD ["java","-Duser.timezone=UTC-3", "-Xms128M","-Xmx128M","-XX:PermSize=64m","-XX:MaxPermSize=128m","-jar","api-cursos.jar"]
