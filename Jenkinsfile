pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'dseu-dashboard-frontend'
        CONTAINER_NAME = 'dseu_dashboard_container'
    }

    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Node Modules') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Vite App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE_NAME}:latest ."
            }
        }

        stage('Stop Previous Container') {
            steps {
                sh """
                docker-compose down || true
                docker rm -f ${CONTAINER_NAME} || true
                """
            }
        }

        stage('Deploy New Container') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo "✅ Build and deployment successful."
        }
        failure {
            echo "❌ Build or deployment failed. Check logs for more info."
        }
    }
}
