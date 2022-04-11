import GridViewIcon from "@mui/icons-material/GridView";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import FileUploadIcon from "@mui/icons-material/FileUpload";
const nav = [
  {
    name: "Dashboard",
    path: "/",
    icon: GridViewIcon,
  },

  {
    name: "Users",
    icon: PeopleAltIcon,
    // role: ["admin"],
    child: [
      {
        name: "List",
        path: "/admin/user",
        // role: ["admin"],
      },
      {
        name: "Create",
        path: "/admin/user/create",
      },
    ],
  },

  {
    name: "Product",
    path: "/product",
    icon: FileUploadIcon,
    // role: ["user"],
  },

  {
    name: "Customer",
    path: "/customer",
    icon: FileUploadIcon,
    // role: ["user"],
  },

  {
    name: "Offering",
    icon: AssessmentIcon,
    path: "/offering",
  },

  {
    name: "Assessment",
    icon: AssessmentIcon,
    // role: ["admin"],
    child: [
      {
        name: "List",
        path: "/assessment",
        // role: ["admin"],
      },
    ],
  },
];

export { nav };
