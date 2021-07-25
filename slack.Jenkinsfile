#!/usr/bin/env groovy

def OUTPUT_FILENAME = 'slack-config.json'

properties([
  buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
  [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: ''],
])

pipeline {
  agent any

  parameters {
    choice(
      name: 'ENVIRONMENT',
      choices: [
          'live',
          'test'
      ],
      description: 'The environment to check'
    )
  }

  stages {
    stage('Setup') {
      steps {
        deleteDir()
        git branch: 'main', url: 'git@github.com:shaywan/jenkins-practice.git'

      }
    }

    stage('Build') {
      steps {
        nodejs('16') {
          sh 'npm install'
          sh "node index.js ${params.ENVIRONMENT} ${OUTPUT_FILENAME}"
        }
      }
    }
  }

  post {
    success {
      script {
        def slackConfig = readJSON file: OUTPUT_FILENAME

        if (slackConfig.attachments.size() > 0) {
          slackSend(channel: 'general', message: slackConfig.text, attachments: slackConfig.attachments)
        }
      }
    }

    failure {
      script {
        slackSend(channel: 'testing', message: "Failed to fetch tomorrow's tournament and stage priority order mappings")
      }
    }
  }
}

