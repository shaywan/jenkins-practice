#!/usr/bin/env groovy

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
          'test',
          'live'
      ],
      description: 'The environment to check',
      defaultValue: 'live'
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

