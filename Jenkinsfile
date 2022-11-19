pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git branch: 'dev', credentialsId: 'git-hub', url: 'https://github.com/hoangcnttbkdn/KMS-PictureFinder-BE.git'
            }
        }
        stage('unit test') {
            steps {
                sh 'echo runtest'
            }
        }
        stage('Docker build and push') {
            steps {
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t hoangsndxqn/kms-pf-be-dev:latest -f ./docker/Dockerfile.prod .'
                    sh 'docker push hoangsndxqn/kms-pf-be-dev:latest'
                }   
            }
        }
        stage('SSH server and deploy') {
            steps{
                sh 'echo deploy'
                sh "ssh -i /var/jenkins_home/.ssh/id_svdev root@128.199.246.141 './deployBEdev.sh'"
            }
            
        }
    }
    post {
    success {
      echo "SUCCESSFUL"
    }
    failure {
      echo "FAILED"
    }
  }
}
