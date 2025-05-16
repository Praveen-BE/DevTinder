const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  //subject body
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${body}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `${subject}`,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async (subject, body) => {
  const sendEmailCommandwithBody = createSendEmailCommand(
    "support@devkadhal.shop",
    "praveenrajendiran3939gmail.com",
    subject,
    body
  );
  try {
    return await sesClient.send(sendEmailCommandwithBody);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { run };
