#
# Build stage
#
FROM maven:3.8-openjdk-8 AS build
COPY sbhrm-api /home/app/sbhrm-api
COPY sbhrm-db /home/app/sbhrm-db
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

#
# Package stage
#
FROM openjdk:8-jre-slim
COPY --from=build /home/app/sbhrm-api/target/*.jar /usr/local/lib/app.jar
ENV PORT 8080
EXPOSE $PORT
ENTRYPOINT java -Dserver.port=$PORT -jar /usr/local/lib/app.jar --spring.profiles.active=prod

