#!/usr/bin/env groovy

properties([
  buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
  [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: ''],
])

pipeline {
  agent any

  stages {
    stage('Setup') {
      steps {
        nodejs('16') {
          sh 'npm install'
        }
      }
    }
  }

  post {
    success {
      script {
        def slackConfig = readJSON file: 'mock-slack-response.json'

        if (slackConfig.attachments.size() > 0) {
          slackSend(channel: 'general', message: slackConfig.text, attachments: slackConfig.attachments)
        }
      }
    }
  }
}

