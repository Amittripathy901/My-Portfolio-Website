// Jenkinsfile
pipeline {
    agent any // This means the pipeline can run on any available Jenkins agent/node

    // Define environment variables if needed (e.g., for SonarQube token)
    environment {
        // SONAR_AUTH_TOKEN is a Jenkins 'Secret Text' credential.
        // You MUST create this credential in Jenkins (Manage Jenkins -> Manage Credentials).
        // Its 'ID' should be 'SONAR_AUTH_TOKEN' and its 'Secret' should be your SonarQube user token.
        SONAR_AUTH_TOKEN = credentials('SONAR_AUTH_TOKEN')
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                echo 'Cloning the project repository...'
                // Replace 'YOUR_GITHUB_USERNAME' and 'YOUR_REPO_NAME' with your actual details
                // And ensure 'main' is the correct branch name
                git branch: 'main', url: 'https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git'
            }
        }

        stage('Install Dependencies & Prepare for Linting') {
            steps {
                echo 'Installing Node.js dependencies for linters...'
                // This assumes you have npm and Node.js set up on your Jenkins agent.
                // It will read your package.json and install devDependencies (linters).
                sh 'npm install'
            }
        }

        stage('Run Linters (Optional, but Recommended to Integrate)') {
            steps {
                echo 'Running HTML, CSS, and JS linters...'
                // These commands run the linting scripts defined in your package.json
                // SonarQube can sometimes pick up reports from these tools if configured in sonar-project.properties
                sh 'npm run lint:html'
                sh 'npm run lint:css'
                sh 'npm run lint:js'
                // Or simply: sh 'npm run lint' if you have a combined lint script
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Starting SonarQube analysis...'
                // 'YOUR_SONARQUBE_SERVER_NAME' must match the name you configured in Jenkins:
                // Go to 'Manage Jenkins' -> 'Configure System' -> Find 'SonarQube servers' section
                withSonarQubeEnv('YOUR_SONARQUBE_SERVER_NAME') {
                    // This command executes the SonarScanner CLI.
                    // It will automatically look for the 'sonar-project.properties' file in your project root.
                    // The sonar.login property uses the SONAR_AUTH_TOKEN defined in Jenkins credentials.
                    sh 'sonar-scanner -Dsonar.login=${SONAR_AUTH_TOKEN}'
                }
            }
        }
    }

    // Post-build actions: What to do after the pipeline finishes
    post {
        always {
            echo 'SonarQube analysis pipeline finished.'
        }
        success {
            echo 'SonarQube analysis was successful! Check your SonarQube dashboard for the report.'
            // You might add an email notification here for success
        }
        failure {
            echo 'SonarQube analysis failed! Review the Jenkins build logs.'
            // You might add an email notification here for failure
        }
    }
}
