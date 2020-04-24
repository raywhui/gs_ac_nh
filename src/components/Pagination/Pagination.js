import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Paginationd(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        style={{ margin: "0 auto" }}
        count={props.length}
        onChange={(e, num) => {
          props.changePage(num - 1);
          console.log(num);
        }}
        variant="outlined"
        boundaryCount={10}
        color="secondary"
      />
    </div>
  );
}
