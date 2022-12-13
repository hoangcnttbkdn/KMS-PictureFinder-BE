pipeline {
    agent any
    environment {
        DOCKER_IMAGE="hoangsndxqn/kms-picture-finder-be-service"
        DOCKER_URL="./docker/Dockerfile.prod"
    }
    stages {
        stage('Prepare workspace') {
            steps {
                echo 'Prepare workspace'
                step([$class: 'WsCleanup'])
                script {
                    def commit = checkout scm
                    env.BRANCH_NAME = commit.GIT_BRANCH.replace('origin/', '')
                }
            }
        }
        // stage('Unit Test') {
        //     agent { 
        //         docker {
        //             image 'node:16.16.0-alpine'
        //         }    
        //     }
        //     steps {
        //         sh 'cp .env.example .env'
        //         sh 'npm install'
        //         sh '''export NODE_OPTIONS=--max_old_space_size=4096 & \
        //         node -e "console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))"'''
        //         sh 'npm run test'
        //         script {
        //             def SUM = sh(script: "cat ./coverage/coverage-summary.json | jq -r .total.lines.pct", returnStdout: true).trim() as Double
        //                 echo "KET QUA TEST: ${SUM}"
        //             if (SUM > 80) {
        //                 return
        //             } else {
        //                 throw new Exception("Unit test don't passed")
        //             }
        //         }
        //     }
        // }
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
        stage('Deploy: DEVELOP') {
            when {
                expression {
                    return (env.BRANCH_NAME == 'dev')
                }
            }
            steps{
                sh 'echo DEVELOP'
                sh "ssh -i /var/jenkins_home/.ssh/beserver hoangsndxqn@35.240.135.215 './developBE.sh'"
            }
        }
        stage('Deploy: RELEASE') {
            when {
                expression {
                    return (env.BRANCH_NAME == "refs/tags/${GIT_BRANCH.tokenize('/').pop()}")
                }
            }
            steps{
                sh 'echo DEVELOP'
                sh "ssh -i /var/jenkins_home/.ssh/beprodkey hoangsndxqn@34.126.120.6 './releaseBE.sh'"
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
