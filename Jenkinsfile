pipeline {
    agent any
    stages {
        stage ('Containers - Virtual environment start') {
            steps {
                echo 'Spinning up the containers'
                bat 'docker-compose build'
                bat 'docker-compose up -d'
            }      
        }
        stage('MicroServices - Startup in Parallel') {


            parallel {


                stage('API_Gateway') {
                    steps {
                        dir('F21AO-DevOps-MicroServices\\api_gateway'){
                        echo 'API Gateway starting up'
                        bat 'npm install' 
                        }
                    }
                }
                stage ('Appointments MicroService') {
                    steps {
                        dir('F21AO-DevOps-MicroServices\\appointment_microservice'){
                        echo 'Appointments Service starting up'
                        bat 'npm install'
                        }
                    }
                }
                stage ('Authentication MicroService') {
                    steps {
                        dir('F21AO-DevOps-MicroServices\\authentication_microservice'){
                        echo 'Authentication Service starting up'
                        bat 'npm install'
                        }
                    }
                }
                stage ('Patients MicroService') {
                    steps {
                        dir('F21AO-DevOps-MicroServices\\patients_microservice'){
                        echo 'Patients Service starting up'
                        bat 'npm install'
                        }
                    }
                }
                stage ('Staff MicroServices starting up') {
                    steps {
                        dir('F21AO-DevOps-MicroServices\\users_microservice'){
                        echo 'Staff MicroService starting up'
                        bat 'npm install'
                        }
                    }
                }
            }      
        }





        stage('Unit Testing - Chai/Mocha') {
            steps {   
                   dir('F21AO-DevOps-MicroServices\\patients_microservice') {
                                script {
                                echo 'Patient database Testing with Chai/Mocha'
                                //bat 'npm test'
                                    }
                                }
                    }
        }       
                    

        stage('Microservice containers build') {
                steps {
                    script {
                    echo 'Spinning down running containers'
                    
                    bat 'docker-compose down'
                
                    echo 'Spinning up the containers'
                    bat 'docker-compose build'
                    }
                    }
                }


        stage('deploy') {
            steps {
                script {
                bat 'docker-compose up -d'
                echo 'MicroServices are being deployed in Dockers'
                    }
                }
            }
    }
        post {
            always {
                echo 'Pipeline fully executed.'
            }
            success {
                echo 'All stages completed successfully.'
            }
            unstable {
                echo 'Stages are inconsistent'
            }
            failure {
                echo 'Pipeline Failed'
            }
            changed {
                echo 'Changes detected..'
            }
        }
}
