var nodemailer = require('nodemailer');

//TODO: have email deets come in through env vars

//TODO: set up email
var transporter = nodemailer.createTransport({
  service: 'Godaddy',
  auth: {
    user: 'no-reply@henrysglasstx.com',
    pass: 'password'
  }
});

var buildMessageBody = message => {
  var customerName = `${message.firstname} ${message.lastname}`

  var body = `Create quote for ${customerName}.\n\n`
  body += `Primary contact: ${message.primary}\n`
  if (message.secondary) {
    body += `Secondary contact: ${message.secondary}\n`
  }
  body += `${customerName}'s message: ${message.message}\n`

  return body
}

var sendMessage = message => {
  var mailOptions = {
    from: 'ndcassiani@gmail.com',
    to: 'ndcassiani@gmail.com',
    subject: `Quote for ${message.firstname} ${message.lastname}`,
    text: `${buildMessageBody(message)}`
  }

  //TODO: uncomment!

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     console.log('Email sent: ' + info.response)
  //   }
  // })
}

module.exports = sendMessage
