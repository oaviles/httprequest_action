const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https')

try {

      const data = JSON.stringify({
        event: 'Calling the API',
      })

      console.log(`myURL: ${core.getInput('url')}`);

    const options = {
        hostname: core.getInput('url'),
        port: 443,
        path: core.getInput('path'),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
      
        res.on('data', d => {
          process.stdout.write(d)
          core.setOutput("status", res.statusCode);
        })
      })

      req.on('error', error => {
        console.error(error)
      })

      req.write(data)
      req.end()

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}