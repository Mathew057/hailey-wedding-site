import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay, virtualize } from "react-swipeable-views-utils";
import pusher from "../utils/pusher";
import Message from "./Message";
import { Grid, Grow } from "@material-ui/core";
import { Image, Transformation } from "cloudinary-react";
import useWindowDimensions from "../utils/hooks";
import axios from "axios";
const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews));

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
    width: "100vw",
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

function SlideRender({ index, key, height, width, images }: any) {
  const style = {
    height: "100vh",
    width: "100vw",
    color: "#fff",
    overflow: "hidden",
  };
  const image_index =
    index < 0 ? (index % images.length) + images.length : index % images.length;
  return (
    <div style={style} key={key}>
      <Image
        publicId={`${images[image_index].public_id}.jpg`}
        style={{ width: "100%", height: "100%" }}
      >
        <Transformation
          height={height}
          width={width}
          crop="fill"
          gravity="auto:faces"
        />
      </Image>
    </div>
  );
}

export default function ChatRoom(_props: any) {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  const [images, setImages] = React.useState([]);
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
      Body:
        "Hi there!\nI'm a message board, feel free to send nice thoughts to (205)782-8137 and I will display them!",
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

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/images`)
      .then((results) => {
        setImages(results.data.resources);
      })
      .catch((error) => console.error(error));
  }, []);

  const { width, height } = useWindowDimensions();
  if (images.length === 0) return <></>;
  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        index={index}
        onChangeIndex={(index) => setIndex(index)}
        interval={10000}
        className={classes.slider}
        slideRenderer={(props) =>
          SlideRender({ ...props, width, height, images })
        }
      />
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
