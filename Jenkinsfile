#!groovy
pipeline {
    agent any

     tools {nodejs "nodeJs",
            docker "docker"}

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
        stage ('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                def customImage = docker.build("${env.DOCKER_REPOSITORY}/javascriptonaws:${env.BUILD_ID}")
                customImage.push()
                customImage.push('latest')
            }
        }
    }
}