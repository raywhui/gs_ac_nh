import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ItemCard from "../ItemCard";

import {
  getOwnedItem,
  getWishlistItem,
  listenForUpdatedData,
} from "../../firebase.utils";

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

function CardGrid(props) {
  const { db } = props.queryData;
  const classes = useStyles();
  const NHData = props.data;
  const dataArr = Object.keys(NHData);
  const filteredData = props.filtered;

  const [ownedData, setOwnedData] = useState("");
  const [wishlistData, setWishlistData] = useState("");

  useEffect(() => {
    if (ownedData === "") {
      getOwnedItem(db).then((data) => {
        setOwnedData(data);
      });
      // Set up db listener
      listenForUpdatedData(db, setOwnedData, setWishlistData);
    }
  }, [ownedData, db]);

  useEffect(() => {
    if (wishlistData === "") {
      getWishlistItem(db).then((data) => {
        setWishlistData(data);
      });
    }
  }, [wishlistData, db]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {dataArr && filteredData.length > 0 ? (
          //Change to filter then map
          filteredData.map((res, i) => {
            if (NHData[res.id]) {
              return (
                <Grid item xs={3} key={i}>
                  <ItemCard
                    nhData={NHData[res.id]}
                    id={res.id}
                    queryData={props.queryData}
                    ownedData={ownedData}
                    wishlistData={wishlistData}
                  />
                </Grid>
              );
            }
          })
        ) : (
          <p style={{ color: "white" }}>Ahh shit, there's nothing here :(</p>
        )}
      </Grid>
    </div>
  );
}

export default CardGrid;
