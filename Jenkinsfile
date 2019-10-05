#!groovy
pipeline {
    agent any

     tools {nodejs "nodeJs"}

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