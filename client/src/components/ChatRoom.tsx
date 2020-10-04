import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import pusher from "../utils/pusher";
import Message from "./Message";
import { Grid, Grow } from "@material-ui/core";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100%",
  },
  slider: {
    height: "100%",
    "& .react-swipeable-view-container": {
      height: "100%",
    },
  },
  slide: {
    padding: theme.spacing(2),
    height: `calc(100% - ${theme.spacing(4)}px)`,
    color: "#fff",
  },
  slide1: {
    backgroundColor: "#FEA900",
  },
  slide2: {
    backgroundColor: "#B3DC4A",
  },
  slide3: {
    backgroundColor: "#6AC0FF",
  },
  messageContainer: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: 0,
    top: theme.spacing(2),
    left: 0,
    padding: theme.spacing(2),
  },
}));

export default function ChatRoom(_props: any) {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  const [messages, setMessages] = React.useState<Array<any>>([
    {
      ToCountry: "US",
      ToState: "AL",
      SmsMessageSid: "SM543090f4e09e62597682d685b08a8fe8",
      NumMedia: "0",
      ToCity: "",
      FromZip: "75422",
      SmsSid: "SM543090f4e09e62597682d685b08a8fe8",
      FromState: "TX",
      SmsStatus: "received",
      FromCity: "GREENVILLE",
      Body: "Test",
      FromCountry: "US",
      To: "+12057828137",
      ToZip: "",
      NumSegments: "1",
      MessageSid: "SM543090f4e09e62597682d685b08a8fe8",
      AccountSid: "AC16b717a886289b105a491446ab306a41",
      From: "+19034566041",
      ApiVersion: "2010-04-01",
    },
  ]);

  React.useEffect(() => {
    var channel = pusher.subscribe("chat");
    channel.bind("message", (new_message: any) => {
      //TODO need to cap the messages to a limit
      setMessages((messages) => [...messages, new_message]);
    });
  }, []);

  React.useEffect(() => {});
  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        index={index}
        onChangeIndex={(index) => setIndex(index)}
        interval={5000}
        className={classes.slider}
      >
        {Array(44)
          .fill(0)
          .map((_, index) => {
            console.log(`${process.env.REACT_APP_API_URL}/images/${index}.jpg`);
            return (
              <div className={classes.slide} key={`${index}`}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/${index}.jpg`}
                  alt="test"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            );
          })}
      </AutoPlaySwipeableViews>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        justify="flex-end"
        alignItems="flex-end"
        className={classes.messageContainer}
        spacing={2}
      >
        {messages.map((message: any) => (
          <Grow in>
            <Grid item>
              <Message message={message} />
            </Grid>
          </Grow>
        ))}
      </Grid>

      {/* <Pagination dots={3} index={index} onChangeIndex={setIndex} /> */}
    </div>
  );
}
