const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const environment = args[0]?.toLowerCase();
const slackConfigFilename = args[1];

const slackConfig = {
  "text": `Slack config for ${environment}`,
  "attachments": [
    {
      "title": "Formula 1",
      "fallback": "Priority order for Formula 1",
      "fields": [
        {
          "title": "Currently promoted",
          "value": "Australian Grand Prix",
          "short": true
        },
        {
          "title": "What's on tomorrow",
          "value": "Hungarian Grand Prix",
          "short": true
        }
      ],
      "color": "#1DE9B6"
    }
  ]
}

fs.writeFileSync(path.join(__dirname, slackConfigFilename) , JSON.stringify(slackConfig));
