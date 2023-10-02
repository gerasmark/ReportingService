pipeline {

    agent any

    stages {

        stage("verify tools") {

            steps {
                sh '''
            docker version 
            docker info 
            docker compose version
            curl --version
        '''
            }
        }

        stage("prune") {

            steps {
                echo "Pruning Docker Data"
            }
        }

        stage("build") {

            steps {
                sh 'docker compose build'
            }
        }

        stage("deploy") {

            steps {
                sh 'docker compose up'
            }
        }

        stage("test") {

            steps {
                echo "Starting Testing"
            }
        }
    }
}