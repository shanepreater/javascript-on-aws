#!groovy
pipeline {
    agent any

     tools {nodejs "nodeJs"}
     tools {docker "docker"}

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
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    def customImage = docker.build("${env.DOCKER_REPOSITORY}/javascriptonaws:${env.BUILD_ID}")
                    customImage.push()
                    customImage.push('latest')
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                sh 'echo deploying to AWS'
            }
        }
    }
}