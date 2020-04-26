import React, { useState, useEffect } from "react";
// import blue from "@material-ui/core/colors/blue";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as firebase from "firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import Button from "@material-ui/core/Button";
import "firebase/auth";
import { chunk } from "lodash";

import "./App.css";
/*Custom Components*/
import AppBar from "./components/AppBar";
import CardGrid from "./components/CardGrid";
import Login from "./components/Login";
import Pagination from "./components/Pagination";

import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import RHBruh from "./images/rhbruh.png";
import Roald from "./images/roald-unapproved.png";

/* Utils */
import { getUserData } from "./firebase.utils";

/*JSON data import*/
import NHData from "./result.json";
// import NHData from "./testData.json";

// firebase init
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBK5awMoELM2K2hntYBXljv6N0Skp0Bfq4",
  authDomain: "gs-ac-nh.firebaseapp.com",
  databaseURL: "https://gs-ac-nh.firebaseio.com",
  projectId: "gs-ac-nh",
  storageBucket: "gs-ac-nh.appspot.com",
  messagingSenderId: "1077250835884",
  appId: "1:1077250835884:web:76775930c428b3d50ae609",
  measurementId: "G-JL5E9C71PQ",
});

// firestore init
const db = firebase.firestore();

// firebase auth init
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333",
    },
    secondary: {
      main: "#f48fb1",
    },
    success: {
      main: "#82F962",
    },
    info: {
      main: "#9A89F9",
    },
    warning: {
      main: "#62F9EF",
    },
    type: "dark",
  },
});

const mappedDataNames = Object.keys(NHData).map((key, i) => {
  return {
    id: NHData[key].id,
    name: NHData[key].name.toLowerCase(),
  };
});

// Splits data into pagination, # is how many values per array
const paginateArray = chunk(mappedDataNames, 50);

function App(props) {
  // States
  const [isSignAndApproved, setIsSignAndApproved] = useState({
    isSignedIn: false,
    isApproved: false,
  });
  // const [currentUser, setNHFilter] = useState(mappedDataNames);
  const [page, setPage] = useState(0);
  const [NHFilter, setNHFilter] = useState(paginateArray[page]);
  const [currentUser, setCurrentUser] = useState({});

  // Set props for auth
  const { user, signOut, signInWithGoogle } = props;

  let filteredData;

  // search/filter logic
  const search = (params) => {
    if (params !== "" && params.length > 2) {
      // if search bar has value, filter entire list
      filteredData = mappedDataNames.filter((data) => {
        return data.name.includes(params.toLowerCase());
      });
    } else {
      // if search bar has no value, default to 1st page of pagination
      filteredData = paginateArray[page];
    }
  };

  // Submit filter logic
  const submitSearch = async () => {
    if (filteredData) {
      await setNHFilter(filteredData);
      return;
    }
  };

  useEffect(() => {
    if (user) {
      setIsSignAndApproved({
        isSignedIn: true,
        isApproved: "pending",
      });
      getUserData(db, user, setIsSignAndApproved, setCurrentUser);
    }
  }, [user]);

  useEffect(() => {
    setNHFilter(paginateArray[page]);
  }, [page]);

  return (
    <div className="App">
      {user &&
      isSignAndApproved.isApproved === true &&
      isSignAndApproved.isSignedIn ? (
        <ThemeProvider theme={theme}>
          <AppBar
            inputChange={search}
            submitSearch={submitSearch}
            paginateArray={paginateArray}
            logout={signOut}
            queryData={{
              firebase,
              db,
              currentUser,
              setNHFilter,
            }}
          />
          <CardGrid
            data={NHData}
            filtered={NHFilter}
            queryData={{
              firebase,
              db,
              currentUser,
              setNHFilter,
            }}
          />
          <Pagination length={paginateArray.length} changePage={setPage} />
          <Fab
            color="secondary"
            aria-label="scroll-to-top"
            style={{ position: "fixed", bottom: "5%", left: "2%" }}
            href="#body"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ThemeProvider>
      ) : user &&
        !isSignAndApproved.isApproved &&
        isSignAndApproved.isSignedIn ? (
        <>
          <h1 style={{ color: "#d0d0d0" }}>
            HEY! Roald hasn't approved your account yet.
          </h1>
          <h3 style={{ color: "#d0d0d0" }}>
            Go away. (He'll approve you later.)
          </h3>
          <img style={{ width: 400 }} src={Roald} alt="roald doesnt approve" />
          <Button
            style={{ display: "block", margin: "20px auto" }}
            variant="contained"
            color="secondary"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </>
      ) : // logged in but not approved
      isSignAndApproved.isApproved === "pending" ? (
        <>
          <img src={RHBruh} className="App-logo" alt="rh bruh" />
        </>
      ) : (
        <Login onClick={signInWithGoogle} />
      )}
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
