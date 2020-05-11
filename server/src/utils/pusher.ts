var Pusher = require("pusher");

var pusher = new Pusher({
  appId: "998670",
  key: "ddecbe84037d6508b9c7",
  secret: "eb429236c379eff3f365",
  cluster: "us2",
  useTLS: true,
});
export default pusher;
