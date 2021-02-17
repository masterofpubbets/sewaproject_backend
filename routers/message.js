const express = require("express");
const router = express.Router();
const Vonage = require("@vonage/server-sdk"); 

const vonage = new Vonage({
    apiKey: "a565e57a",
    apiSecret: "6qpmqAEdpu30xXHs",
    applicationId: "8feedc1e-5c21-4ed8-83fa-0ae23850c014",
    privateKey: "./keys/private3.key"
  });

router.get('/', (req, res) => {
    res.status(200).send('YOU ARE IN MESSAGE ROOT');
});

router.post('/sndsms', async (req, res) => {
    //const from = 'Vonage APIs';
    const from = "14157386170";
    const to = "96566098231";
    const text = "Hello from Vonage SMS API";
    try {
        vonage.dispatch.create(
            "failover",
            [
              {
                from: { type: "whatsapp", number: from },
                to: { type: "whatsapp", number: to },
                message: {
                  content: {
                    type: "text",
                    text: "Dispatch API: Message 1"
                  }
                },
                failover: {
                  expiry_time: 60,
                  condition_status: "read"
                }
              }
            ],
            (err, data) => {
              if (err) {
                res.status(400).send(err)
              } else {
                res.status(200).send(data.dispatch_uuid)
              }
            }
          )
    } catch (er) {
        res.status(400).send(er)
    }
});






module.exports = router;
