#!/usr/bin/env groovy

properties([
  buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
  [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: ''],
])

pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        deleteDir()
      }
    }

    stage('Build') {
      steps {
        nodejs('16') {
          sh 'npm install'
          sh 'node index.js'
        }
      }
    }
  }

  post {
    success {
      script {
        def slackConfig = readJSON file: 'slack-config.json'

        if (slackConfig.attachments.size() > 0) {
          slackSend(channel: 'general', message: slackConfig.text, attachments: slackConfig.attachments)
        }
      }
    }
  }
}

