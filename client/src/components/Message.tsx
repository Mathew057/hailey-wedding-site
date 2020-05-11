import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    maxWidth: 500,
    backgroundColor: fade(theme.palette.background.paper, 0.75),
  },
}));
export default function Message(props: { message: any }) {
  const classes = useStyles();
  const { message } = props;
  const phoneUtil = PhoneNumberUtil.getInstance();
  const number = phoneUtil.parseAndKeepRawInput(
    message.From,
    message.FromCountry
  );

  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle2">
        {phoneUtil.format(number, PhoneNumberFormat.NATIONAL)}
      </Typography>
      <Typography variant="body2">{message.Body}</Typography>
    </Paper>
  );
}
