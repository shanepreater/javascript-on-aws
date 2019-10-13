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
                        docker.login "--username ${user} --password ${password}"
                        def customImage = docker.build "${env.DOCKER_ID}/javascriptonaws:${env.BUILD_ID}"
                        customImage.push()
                        customImage.push('latest')
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