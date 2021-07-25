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
        print "test"
        println slackConfig

        slackSend(channel: 'testing', message: "Pipeline message")
      }
    }
  }
}

