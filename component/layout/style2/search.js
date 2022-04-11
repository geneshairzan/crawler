import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MainNav from "./navigation";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import NoIMg from "assets/noimg.jpg";
import SearchIcon from "@material-ui/icons/Search";

import {
  Box,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  anchorRef,
  InputBase,
  TextField,
  InputAdornment,
} from "@material-ui/core";

export default function IconSearch(params) {
  return (
    <TextField
      id="outlined-adornment-password"
      type="text"
      variant="outlined"
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              // onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <SearchIcon className="f-white" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      // value={values.password}
      // onChange={handleChange("password")}
      endAdornment={<InputAdornment position="end"></InputAdornment>}
      labelWidth={70}
    />
  );
}
