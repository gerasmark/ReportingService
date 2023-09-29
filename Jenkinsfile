pipeline {

    agent any

    stages {

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