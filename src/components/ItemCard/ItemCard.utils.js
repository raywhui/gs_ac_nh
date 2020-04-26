import { getUserOwned, getUserWishlist } from "../../firebase.utils";

const renderUserOwned = (
  firestore,
  userId,
  setFilterState,
  setDisabledState
) => {
  getUserOwned(firestore, userId, setFilterState)
    .then((data) => {
      data ? setFilterState(data) : setFilterState([]);
    })
    .then(() => {
      setDisabledState(false);
    });
};

const renderUserWishlisted = (
  firestore,
  userId,
  setFilterState,
  setDisabledState
) => {
  getUserWishlist(firestore, userId, setFilterState)
    .then((data) => {
      data ? setFilterState(data) : setFilterState([]);
    })
    .then(() => {
      setDisabledState(false);
    });
};

export { renderUserOwned, renderUserWishlisted };
