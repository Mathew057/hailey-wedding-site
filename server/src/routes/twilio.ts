import { Router } from "express";
import pusher from "../utils/pusher";
let router: Router = Router({ mergeParams: true });
// import {twiml} from "twilio"
// const MessagingResponse = twiml.MessagingResponse;

router.post("/sms", (req, res) => {
  //   const twiml = new MessagingResponse();

  //   twiml.message("The Robots are coming! Head for the hills!");

  //   res.writeHead(200, { "Content-Type": "text/xml" });
  //   res.end(twiml.toString());
  pusher.trigger("chat", "message", req.body);
  res.status(200).send();
});

module.exports = router;
