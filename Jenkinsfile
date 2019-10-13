#!groovy
pipeline {
    agent any

    tools { nodejs "nodeJs" }

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
                withDockerRegistry('dockerhub') {
                    docker.build "${env.DOCKER_REPOSITORY}/javascriptonaws:${env.BUILD_ID}"
                    customImage.push()
                    customImage.push('latest')
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