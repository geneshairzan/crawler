import React, { useContext } from "react";
import { Typography, Stack, IconButton, MenuItem, Menu } from "@mui/material";
import Context from "component/provider/context";
import { fetcher } from "component/formHelper/useForm";

import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionConfirm from "component/ui/actionConfirm";

export default function Action({ model, id, isRefetch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setisLoading } = useContext(Context);

  async function deleteUser(params) {
    setisLoading(true);
    let data = await fetcher({
      url: `/api/${model}`,
      method: "post",
      data: {
        id: id,
        deleted_at: new Date(),
      },
    });

    data && isRefetch(true, setisLoading(false));
  }

  return (
    <Stack className="center">
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link href={`${model}/${id}`}>
          <MenuItem>Edit</MenuItem>
        </Link>
        <MenuItem>
          <ActionConfirm
            msgTitle={`Are your sure want to delete this ${model} ?`}
            element={<Typography color="error">Delete</Typography>}
            onYes={() => deleteUser()}
            isOpen={() => {}}
          />
        </MenuItem>
      </Menu>
    </Stack>
  );
}
