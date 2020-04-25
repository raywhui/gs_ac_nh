import { getUserOwned } from "../../firebase.utils";

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

export { renderUserOwned };
