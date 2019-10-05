#!groovy
pipeline {
    agent any

     tools {nodejs "nodeJs"}

    stages {
        stage('Setup') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage ('Build') {
                sh 'npm run build'
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}