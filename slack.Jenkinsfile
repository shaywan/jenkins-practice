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
        script {
          println("Perform some task")
        }
      }
    }
  }

  post {
    success {
      script {
        def slackConfig = readJSON file: 'mock-slack-response.json'

        if (slackConfig.attachments.size() > 0) {
          slackSend(channel: 'testing', message: slackConfig.text, attachments: slackConfig.attachments)
        }
      }
    }
  }
}

