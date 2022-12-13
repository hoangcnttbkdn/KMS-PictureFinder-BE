pipeline {
    agent any
    environment {
        DOCKER_IMAGE="hoangsndxqn/kms-picture-finder-be-service"
        DOCKER_URL="./docker/Dockerfile.prod"
    }
    stages {
        stage('Test') {
            steps {
                sh 'echo Test passed'
            }
        }
        stage('Docker build and push') {
            environment {
                DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
            }
            steps {
                script {
                    echo DOCKER_TAG
                }
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -f ${DOCKER_URL} . "
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                sh "docker image ls | grep ${DOCKER_IMAGE}"
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
                sh "docker image rm ${DOCKER_IMAGE}:${DOCKER_TAG}"
                sh "docker image rm ${DOCKER_IMAGE}:latest"
            }
        }
        stage('SSH server and deploy') {
            steps{
                sh 'echo deploy'
                sh "ssh -i /var/jenkins_home/.ssh/beserver hoangsndxqn@35.240.135.215 './deployBE.sh'"
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
