import { Router } from "express";
let router: Router = Router({ mergeParams: true });
import cloudinary from "cloudinary"
// import {twiml} from "twilio"
// const MessagingResponse = twiml.MessagingResponse;

router.get("/", async (req, res) => {
  const results = await cloudinary.v2.search
    .expression("folder:hailey-wedding")
    .sort_by("public_id", "desc")
    .execute()
  return res.json(results)
});

module.exports = router;
