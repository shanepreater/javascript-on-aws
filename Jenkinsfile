#!groovy
pipeline {
    agent any

    tools { nodejs "nodeJs"}

    environment {
        DOCKER_ID = "shanepreater"
        IMAGE_NAME = "javascriptonaws"
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
                sh 'echo deploying to AWS'
            }
        }
    }
}