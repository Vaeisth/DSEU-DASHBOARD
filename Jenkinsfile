pipeline {
    agent any

    environment {
        // You can adjust these names as needed
        DOCKER_IMAGE_NAME = 'dseu-dashboard-frontend'
        CONTAINER_NAME = 'dseu_dashboard_container'
        TZ = 'Asia/Kolkata'
    }

    options {
        skipDefaultCheckout() // We will manually checkout from Git
    }

    stages {
        stage('Checkout Code') {
            steps {
                // This automatically uses the SCM settings configured in Jenkins job
                checkout scm
            }
        }

        stage('Set Timezone') {
            steps {
                sh '''
                echo "Setting timezone to Asia/Kolkata"
                sudo timedatectl set-timezone Asia/Kolkata || true
                '''
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
