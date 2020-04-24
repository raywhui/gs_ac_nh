const getOwnedItem = (firestore) => {
  firestore
    .collection("data")
    .doc(`owned`)
    .get()
    .then((doc) => {
      console.log(doc.data());
    });
};

const updateOwnedItem = (firebase, firestore, itemId) => {
  firestore
    .collection("data")
    .doc(`owned`)
    .update({
      whfklasjflskf: firebase.firestore.FieldValue.arrayUnion(
        "greater_fvirginia"
      ),
    });
};

const setUserData = (firestore, user) => {
  firestore
    .collection("user")
    .doc(`${user.uid}`)
    .set({
      approved: false,
      photo: user.photoURL,
      name: user.displayName.split(" ")[0],
      createdAt: user.metadata.creationTime,
    });
};

const getUserData = (firestore, user, setState) => {
  firestore
    .collection("user")
    .doc(`${user.uid}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setState({
          isSignedIn: true,
          isApproved: doc.data().approved,
        });
      } else {
        // doc.data() will be undefined in this case
        setUserData(firestore, user);
        setState({
          isSignedIn: true,
          isApproved: false,
        });
      }
    });
};

export { getOwnedItem, getUserData, setUserData, updateOwnedItem };
