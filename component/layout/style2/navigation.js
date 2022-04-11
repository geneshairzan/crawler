import LogoutIcon from "@mui/icons-material/Logout";
import { Collapse, ListItem, Stack, Typography } from "@mui/material";
import Context from "component/provider/context";
import React from "react";
import Link from "next/link";
import { nav } from "component/layout/nav";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function MainNav({ isOpen, parentOpen }) {
  const [open, setopen] = React.useState();
  const { auth } = React.useContext(Context);
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));

  React.useEffect(() => {
    open && isOpen(true);
    !parentOpen && isOpen(false);
  }, [open]);

  const hasRole = (role) => {
    if (role && !role.includes(auth.role.role)) return false;
    return true;
  };

  function handleNav() {
    isSmall && isOpen(false);
  }

  return (
    <Stack spacing={1} py={3} height={"100vh"} justifyContent="space-between">
      <Stack>
        {nav.map((d, ix) => (
          <Stack key={ix}>
            {d.path && hasRole(d.role) && (
              <Stack onClick={handleNav}>
                <RenderSingle data={d} />
              </Stack>
            )}
            {!d.path && hasRole(d.role) && (
              <>
                <ListItem
                  button
                  onClick={() => setopen(open === d.name ? "" : d.name)}
                >
                  <Stack direction={"row"} spacing={2} overflow="hidden">
                    <d.icon className="f-white" />
                    <Typography variant="body1" className="f-white">
                      {d.name}
                    </Typography>
                  </Stack>
                </ListItem>
                <Collapse
                  in={open === d.name && parentOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <Stack
                    ml={7}
                    borderLeft={isOpen ? "2px solid" : null}
                    borderColor={"#a4a4a4"}
                  >
                    {d.child.map(
                      (dc, ix) =>
                        hasRole(dc.role) && (
                          <Link href={`${dc.path}` || "/"} key={ix}>
                            <ListItem button onClick={handleNav}>
                              <Typography variant="body1" className="f-white">
                                {dc.name}
                              </Typography>
                            </ListItem>
                          </Link>
                        )
                    )}
                  </Stack>
                </Collapse>
              </>
            )}
          </Stack>
        ))}
      </Stack>
      <Stack px={2}>
        <RenderSingle
          data={{ icon: LogoutIcon, name: "Logout", path: "/logout" }}
        />
      </Stack>
    </Stack>
  );
}

function RenderSingle({ data }) {
  return (
    <Link href={`${data.path}` || "/"}>
      <ListItem button>
        <Stack direction={"row"} spacing={2} overflow="hidden">
          {data.icon && <data.icon className="f-white" />}
          <Typography variant="body1" className="f-white">
            {data.name}
          </Typography>
        </Stack>
      </ListItem>
    </Link>
  );
}
