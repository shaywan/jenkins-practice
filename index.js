const fs = require('fs');
const path = require('path');

const message = {
  message: 'hello world'
}

fs.writeFileSync(path.join(__dirname), 'message.json', JSON.stringify(message));
