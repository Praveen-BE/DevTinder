const cron = require("node-cron");
const ConnectionRequest = require("../models/connectionRequest");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");

cron.schedule("32 8 * * *", async () => {
  //send Emails to all people who got requests the previous day
  try {
    const yesterday = subDays(new Date(), 0);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);
    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");
    // console.log("This is list of Pending Requests " + pendingRequests);
    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];
    console.log(listOfEmails);

    for (const email of listOfEmails) {
      try {
        const res = await sendEmail.run(
          <h2 style="color: #FF5733; text-align: center;">
            🔔 New Connection Request for {{ email }}
          </h2>,
          <div>
            <div style="background-color: #F8F8F8; padding: 20px; border-radius: 8px;">
              <p style="font-family: Arial, sans-serif; font-size: 18px;">
                🔥 Exciting news! Someone wants to connect with you.
              </p>
              <p style="text-align: center;">
                <a
                  href="https://DevKadhal.shop"
                  style="
      background-color: #FF5733; 
      color: white; 
      padding: 10px 20px; 
      text-decoration: none; 
      border-radius: 5px;
    "
                >
                  View Request
                </a>
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.6;">
              You've received a new connection request! Visit
              <a href="https://DevKadhal.shop" style="color: #007BFF;">
                DevKadhal.shop
              </a>
              to check it out.
            </p>
            <hr />
            <p style="text-align: center; font-size: 14px;">
              ✉️ Contact us: <a href="mailto:support@devkadhal.shop">Support</a>
            </p>
            <p style="text-align: center; font-size: 12px; color: grey;">
              You’re receiving this email because of your activity on
              DevKadhal.shop.
            </p>
          </div>,
          "praveenrajendiran3939@gmail.com"
        );
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
