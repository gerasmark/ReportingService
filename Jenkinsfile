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

        stage("build") {

            steps {
                sh 'docker compose up'
            }
        }

        stage("deploy") {

            steps {
                echo "good job"
            }
        }

        stage("test") {

            steps {
                echo "Starting Testing"
            }
        }
    }
}