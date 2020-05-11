import Pusher from "pusher-js";
Pusher.logToConsole = true;

var pusher = new Pusher("ddecbe84037d6508b9c7", {
  cluster: "us2",
});

export default pusher;
