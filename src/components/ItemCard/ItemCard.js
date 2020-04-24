import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getOwnedItem } from "../../firebase.utils";

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

export default function ItemCard(props) {
  const { id, firebase, firestore } = props;

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
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          + Owned
        </Button>
        <Button size="small" color="secondary">
          + Wishlist
        </Button>
      </CardActions>
      <CardActions style={{ flexFlow: "wrap" }}>
        <Button size="small" variant="contained" color="secondary">
          France
        </Button>
        <Button size="small" variant="contained" color="secondary">
          Alvin
        </Button>
        <Button size="small" variant="contained" color="secondary">
          James
        </Button>
        <Button size="small" variant="contained" color="secondary">
          Ray
        </Button>
      </CardActions>
    </Card>
  );
}
