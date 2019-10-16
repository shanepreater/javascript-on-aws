#!groovy
pipeline {
    agent any

    tools { nodejs "nodeJs" }

    environment {
        DOCKER_ID = "shanepreater"
        IMAGE_NAME = "javascriptonaws"
        ENVIRONMENT_NAME = "staging"
    }

    stages {
        stage('Setup') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
                withSonarQubeEnv('sonar') {
                    sh "npm run sonar"
                }
            }
        }
        stage('Build') {
            when {
                branch 'master'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'password', usernameVariable: 'user')]) {
                    echo "Building docker image javascriptonaws:${env.BUILD_ID}"
                    script {
                        sh "docker login --username $user --password $password"
                        echo "Login complete. Building image..."
                        sh "docker build -t ${env.DOCKER_ID}/${env.IMAGE_NAME}:${env.BUILD_ID} ."
                        echo "Image built. Tagging with latest"
                        sh "docker tag ${env.DOCKER_ID}/${env.IMAGE_NAME}:${env.BUILD_ID} ${env.DOCKER_ID}/${env.IMAGE_NAME}:latest"
                        sh "docker push ${env.DOCKER_ID}/${env.IMAGE_NAME}:${env.BUILD_ID}"
                        sh "docker push ${env.DOCKER_ID}/${env.IMAGE_NAME}:latest"
                        echo "Pushed with tags."
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                echo 'deploying to AWS'
                echo " -> Creating the Dockerrun.aws.json file"
                writeFile file: 'Dockerrun.aws.json', text: """{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "${env.DOCKER_ID}/${env.IMAGE_NAME}:${env.BUILD_ID}",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": "3000"
    }
  ]
}
"""
                echo " -> Updating the S3 bucket"
                sh "aws s3 mb s3://${env.DOCKER_ID}-${IMAGE_NAME}-${env.BUILD_ID}"

                echo " -> Uploading Dockerrun.aws.json"
                sh "aws s3 cp Dockerrun.aws.json s3://${env.DOCKER_ID}-${IMAGE_NAME}-${env.BUILD_ID}"

                echo " -> Creating application version"
                sh "aws elasticbeanstalk create-application-version --auto-create-application --application-name ${env.IMAGE_NAME} --version-label v${env.BUILD_ID} --source-bundle S3Bucket=${env.DOCKER_ID}-${IMAGE_NAME}-${env.BUILD_ID},S3Key=Dockerrun.aws.json"

                echo " -> Deploying new version"
                sh "aws elasticbeanstalk update-application-version --application-name ${env.IMAGE_NAME} --version-label v${env.BUILD_ID}"

                echo " -> Upgrading the ${env.ENVIRONMENT_NAME} with the new deployment"
                sh "aws elasticbeanstalk update-environment --environment-name ${env.ENVIRONMENT_NAME} --application-name ${env.IMAGE_NAME} --version-label v${env.BUILD_ID}"
            }
        }
    }
}
