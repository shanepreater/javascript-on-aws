#!groovy
pipeline {
    agent any

    tools { nodejs "nodeJs"}


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
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'pass', usernameVariable: 'user')]) {
                    echo "Building docker image javascriptonaws:${env.BUILD_ID}"
                    script {
                        sh 'docker login --username ${user} --password ${password}'
                        echo "Login complete. Building image..."
                        sh "docker build -t javascriptonaws:${env.BUILD_ID} ."
                        echo "Image built. Tagging with latest"
                        sh "docker tag javascriptonaws:${env.BUILD_ID} javascriptonaws:latest"
                        sh "docker push javascriptonaws:${env.BUILD_ID}"
                        sh "docker push javascriptonaws:latest"
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