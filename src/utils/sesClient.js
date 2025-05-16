const { SESClient } = require("@aws-sdk/client-ses");
const dotenv = require("dotenv");
dotenv.config();
const REGION = "ap-south-1";
const sesClient = new SESClient({
  region: REGION,
  Credential: {
    accesskeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY,
  },
});

module.exports = { sesClient };
