import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

export default function CategoryMenu(props) {
  const { setNHData, setDataReference } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentCategory, setCurrentCategory] = useState("furniture");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const categoryFunction = (str) => {
    setCurrentCategory(str);
    setDataReference(str.replace(/\s+/g, ""));
  };

  return (
    <div style={{ padding: "6px 8px" }}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {currentCategory} <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(e) => {
            categoryFunction(e.target.textContent.toLowerCase());
            handleClose();
          }}
        >
          Furniture
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            categoryFunction(e.target.textContent.toLowerCase());
            handleClose();
          }}
        >
          Flooring
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            categoryFunction(e.target.textContent.toLowerCase());
            handleClose();
          }}
        >
          Wallpaper
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            categoryFunction("viewAll");
            handleClose();
          }}
        >
          View All
          <p style={{ fontSize: 12, margin: 0, marginLeft: 3 }}>
            {`(This'll take a few seconds to load)`}
          </p>
        </MenuItem>
      </Menu>
    </div>
  );
}
