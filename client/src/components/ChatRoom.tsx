import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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
    {
      ToCountry: "US",
      ToState: "AL",
      SmsMessageSid: "SM64dea19b4d5f3fd8e2f029ecaf1e178f",
      NumMedia: "0",
      ToCity: "",
      FromZip: "75422",
      SmsSid: "SM64dea19b4d5f3fd8e2f029ecaf1e178f",
      FromState: "TX",
      SmsStatus: "received",
      FromCity: "GREENVILLE",
      Body:
        "Knowledge nay estimable questions repulsive daughters boy. Solicitude gay way unaffected expression for. His mistress ladyship required off horrible disposed rejoiced. Unpleasing pianoforte unreserved as oh he unpleasant no inquietude insipidity. Advantages can discretion possession add",
      FromCountry: "US",
      To: "+12057828137",
      ToZip: "",
      NumSegments: "2",
      MessageSid: "SM64dea19b4d5f3fd8e2f029ecaf1e178f",
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
  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        index={index}
        onChangeIndex={(index) => setIndex(index)}
        className={classes.slider}
      >
        <div className={clsx(classes.slide, classes.slide1)}>slide n°1</div>
        <div className={clsx(classes.slide, classes.slide2)}>slide n°2</div>
        <div className={clsx(classes.slide, classes.slide3)}>slide n°3</div>
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
