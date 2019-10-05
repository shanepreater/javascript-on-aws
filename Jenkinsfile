#!groovy
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                npm install
                npm run build
            }
        }
        stage('Test') {
            steps {
                npm run test
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}