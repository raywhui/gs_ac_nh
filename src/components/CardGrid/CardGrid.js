import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ItemCard from "../ItemCard";
import * as firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20,
    maxWidth: 1400,
    margin: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text,
  },
}));

// const db = firebase.firestore();

function CardGrid(props) {
  const classes = useStyles();
  const NHData = props.data;
  const dataArr = Object.keys(NHData);
  const filteredData = props.filtered;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {dataArr && filteredData.length > 0 ? (
          filteredData.map((res, i) => {
            return (
              <Grid item xs={3} key={i}>
                <ItemCard
                  nhData={NHData[res.id]}
                  id={res.id}
                  firebase={props.firebase}
                  firestore={props.firestore}
                />
              </Grid>
            );
          })
        ) : (
          <p style={{ color: "white" }}>Ahh shit, there's nothing here :(</p>
        )}
      </Grid>
    </div>
  );
}

export default CardGrid;
