import React, { useState } from "react";
import { orderBy } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  updateOwnedItem,
  removeOwnedItem,
  updateWishlist,
  removeWishlist,
} from "../../firebase.utils";
import { renderUserOwned, renderUserWishlisted } from "./ItemCard.utils";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 128,
    width: 128,
    margin: "auto",
    paddingTop: 20,
  },
});

//{name: "Jesus", id: "q17Quzp8e0TjH8xio8VZYSoOJpW2"}

export default function ItemCard(props) {
  const { firebase, db, currentUser, setNHFilter } = props.queryData;
  const { id, ownedData, wishlistData } = props;

  const [disabled, setDisabled] = useState(false);

  const ownsItem = orderBy(ownedData[id], ["name"], ["asc"]);
  const wishlistedItem = orderBy(wishlistData[id], ["name"], ["asc"]);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://villagerdb.com${props.nhData.image.thumb}`}
          title={props.nhData.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.nhData.name}
          </Typography>
          {props.nhData.variations ? (
            <Typography variant="body2" color="textSecondary" component="p">
              Variations:{" "}
              {Object.entries(props.nhData.variations)
                .map((val) => val[1])
                .join(", ")}
            </Typography>
          ) : (
            ""
          )}
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "space-between" }}>
        {ownsItem ? (
          ownsItem.findIndex((e) => e.userId === currentUser.id) === -1 ? (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                updateOwnedItem(
                  firebase,
                  db,
                  currentUser,
                  id,
                  props.nhData.name
                );
              }}
            >
              + Owned
            </Button>
          ) : (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                removeOwnedItem(
                  firebase,
                  db,
                  currentUser,
                  id,
                  props.nhData.name
                );
              }}
            >
              - Owned
            </Button>
          )
        ) : (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              updateOwnedItem(firebase, db, currentUser, id, props.nhData.name);
            }}
          >
            + Owned
          </Button>
        )}
        {wishlistData[id] ? (
          wishlistData[id].findIndex((e) => e.userId === currentUser.id) ===
          -1 ? (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                updateWishlist(
                  firebase,
                  db,
                  currentUser,
                  id,
                  props.nhData.name
                );
              }}
            >
              + Wishlist
            </Button>
          ) : (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                removeWishlist(
                  firebase,
                  db,
                  currentUser,
                  id,
                  props.nhData.name
                );
              }}
            >
              - Wishlist
            </Button>
          )
        ) : (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              updateWishlist(firebase, db, currentUser, id, props.nhData.name);
            }}
          >
            + Wishlist
          </Button>
        )}
      </CardActions>
      <CardActions style={{ flexFlow: "wrap" }}>
        {ownsItem.length !== 0 ? "Owned:" : ""}
        {ownsItem
          ? ownsItem.map((data, i) => {
              return (
                <Button
                  className={`users-owned-button ${data.name}-owned-button`}
                  size="small"
                  variant="contained"
                  disabled={disabled}
                  key={i}
                  onClick={() => {
                    setDisabled(true);
                    renderUserOwned(db, data.userId, setNHFilter, setDisabled);
                  }}
                >
                  {data.name}
                </Button>
              );
            })
          : ""}
      </CardActions>
      <Divider variant="middle" />
      <CardActions style={{ flexFlow: "wrap" }}>
        {wishlistedItem.length !== 0 ? "Wishlist:" : ""}
        {wishlistedItem
          ? wishlistedItem.map((data, i) => {
              return (
                <Button
                  className={`users-wishlisted-button ${data.name}-wishlisted-button`}
                  size="small"
                  variant="outlined"
                  disabled={disabled}
                  key={i}
                  onClick={() => {
                    setDisabled(true);
                    renderUserWishlisted(
                      db,
                      data.userId,
                      setNHFilter,
                      setDisabled
                    );
                  }}
                >
                  {data.name}
                </Button>
              );
            })
          : ""}
      </CardActions>
    </Card>
  );
}
