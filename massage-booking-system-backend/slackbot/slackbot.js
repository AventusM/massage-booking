const { WebClient } = require('@slack/web-api')

// currently configured to send to test workspace
// to use require slackbot and call with slackbot('your message)
const slackbot = message => {
  // Create a new instance of the WebClient class with the token read from your environment variable
  const web = new WebClient(process.env.SLACK_TOKEN)

  const sendMessage = (async () => {
    await web.chat.postMessage({
      channel: '#general',
      text: `${message}`,
    })
  })()
}

module.exports = slackbot
