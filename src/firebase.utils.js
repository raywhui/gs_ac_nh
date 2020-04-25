/* Owned Item Utils*/
const getOwnedItem = async (firestore) => {
  const data = await firestore.collection("data").doc(`owned`).get();
  const ownedData = data.data();
  return ownedData;
};

const updateOwnedItem = (firebase, firestore, user, itemId, itemName) => {
  const batch = firestore.batch();
  firestore
    .collection("data")
    .doc("owned")
    .update({
      [itemId]: firebase.firestore.FieldValue.arrayUnion({
        userId: user.id,
        name: user.name,
      }),
    });
  firestore
    .collection("data")
    .doc("userOwned")
    .update({
      [user.id]: firebase.firestore.FieldValue.arrayUnion({
        id: itemId,
        name: itemName,
      }),
    });
  batch.commit().catch((e) => {
    console.log(e);
  });
};

const removeOwnedItem = (firebase, firestore, user, itemId, itemName) => {
  const batch = firestore.batch();
  firestore
    .collection("data")
    .doc("owned")
    .update({
      [itemId]: firebase.firestore.FieldValue.arrayRemove({
        userId: user.id,
        name: user.name,
      }),
    });
  firestore
    .collection("data")
    .doc("userOwned")
    .update({
      [user.id]: firebase.firestore.FieldValue.arrayRemove({
        id: itemId,
        name: itemName,
      }),
    });
  batch.commit().catch((e) => {
    console.log(e);
  });
};

/* Database Listener */
const listenForUpdatedData = (firebase, setOwnedState, setWishlistState) => {
  firebase.collection("data").onSnapshot((snapshot) => {
    let oldSnapshot;
    if (oldSnapshot === snapshot) {
      return;
    } else {
      oldSnapshot = snapshot;
      snapshot.forEach((doc) => {
        if (doc.id === "owned") {
          setOwnedState(doc.data());
        } else if (doc.id === "wishlist") {
          setWishlistState(doc.data());
        }
      });
    }
  });
};

/*Wishlist Utils*/
const getWishlistItem = async (firestore) => {
  const data = await firestore.collection("data").doc("wishlist").get();
  const wishlistData = data.data();
  return wishlistData;
};

const updateWishlist = (firebase, firestore, user, itemId, itemName) => {
  const batch = firestore.batch();
  firestore
    .collection("data")
    .doc("wishlist")
    .update({
      [itemId]: firebase.firestore.FieldValue.arrayUnion({
        userId: user.id,
        name: user.name,
      }),
    });
  firestore
    .collection("data")
    .doc("userWishlist")
    .update({
      [user.id]: firebase.firestore.FieldValue.arrayUnion({
        id: itemId,
        name: itemName,
      }),
    });
  batch.commit().catch((e) => {
    console.log(e);
  });
};

const removeWishlist = (firebase, firestore, user, itemId, itemName) => {
  const batch = firestore.batch();
  firestore
    .collection("data")
    .doc("wishlist")
    .update({
      [itemId]: firebase.firestore.FieldValue.arrayRemove({
        userId: user.id,
        name: user.name,
      }),
    });
  firestore
    .collection("data")
    .doc("userWishlist")
    .update({
      [user.id]: firebase.firestore.FieldValue.arrayRemove({
        id: itemId,
        name: itemName,
      }),
    });
  batch.commit().catch((e) => {
    console.log(e);
  });
};

/*User Utils*/
const setUserData = (firestore, user) => {
  firestore
    .collection("user")
    .doc(`${user.uid}`)
    .set({
      approved: false,
      id: user.uid,
      photo: user.photoURL,
      name: user.displayName.split(" ")[0],
      createdAt: user.metadata.creationTime,
    });
};

const getUserData = (firestore, user, setState, setUserState) => {
  firestore
    .collection("user")
    .doc(`${user.uid}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let userData = doc.data();
        setState({
          isSignedIn: true,
          isApproved: userData.approved,
        });
        setUserState({
          name: userData.name,
          id: userData.id,
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

const getUserOwned = async (firestore, userId) => {
  const data = await firestore.collection("data").doc("userOwned").get();
  const ownedData = data.data();
  return ownedData[userId];
};

const getUserWishlist = async (firestore, userId) => {
  const data = await firestore.collection("data").doc("userWishlist").get();
  const ownedData = data.data();
  return ownedData[userId];
};

export {
  getOwnedItem,
  updateOwnedItem,
  removeOwnedItem,
  getWishlistItem,
  updateWishlist,
  removeWishlist,
  getUserData,
  setUserData,
  listenForUpdatedData,
  getUserOwned,
  getUserWishlist,
};
