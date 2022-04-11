import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  responsiveFontSizes,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import React from "react";
import Context from "./context";

const ButtonPallet = {
  primary: {
    main: "#3178a9",
  },
  secondary: {
    main: "#4CE2E4",
  },
  accwhite: {
    main: "#FFFFFF",
  },
  accgrey: {
    a: "#4b4b4b",
    b: "#838692",
    c: "#c8c8c8",
  },
  accred: {
    main: "#ff0000",
  },

  error: {
    light: "#BB1C2A",
    main: "#BB1C2A",
    dark: "#BB1C2A",
  },
};

const darkPallet = {
  mode: "dark",
  background: {
    default: "#373d4a",
    bgdrawer: "#282d37",
    paper: "#272727",
  },
  ...ButtonPallet,
};

const lightPallet = {
  mode: "light",
  background: {
    default: "#f5f5f5",
    bgdrawer: "#102737",
    paper: "#ffffff",
  },
  ...ButtonPallet,
};

export default function App(props) {
  const { theme } = React.useContext(Context);

  let themeLoader = createTheme({
    palette: theme === "dark" ? darkPallet : lightPallet,
    typography: {
      fontFamily: "Montserrat",
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: "normal",
      },
      h6: {},
      body2: {
        fontWeight: "normal",
      },
      caption: {
        fontWeight: "normal",
      },
      overline: {
        lineHeight: "unset",
      },
    },

    components: {
      MuiTable: {
        styleOverrides: {
          root: {
            // display: "none",
            margin: "0 18px",
            width: "calc(100% - 36px)",
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "0 8px",
          },
          head: {
            button: {
              color: ButtonPallet.primary.main,
              fontWeight: "500",
              textTransform: "uppercase",
            },
          },
        },
      },

      MuiAppBar: {
        defaultProps: {
          enableColorOnDark: true,
        },
      },

      MuiTextField: {
        defaultProps: {
          size: "small",
          autoComplete: "new-password",
          inputProps: {
            autoComplete: "new-password",
            form: {
              autoComplete: "new-password",
            },
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "none",
        },
      },
      MuiButton: {
        styleOverrides: {
          containedSecondary: {
            fontWeight: "bold",
          },
        },
      },

      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: "h2",
            h2: "h2",
            h3: "h2",
            h4: "h2",
            h5: "h2",
            h6: "h2",
            subtitle1: "p",
            subtitle2: "p",
            caption: "p",
            body1: "p",
            body2: "p",
            overline: "p",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={responsiveFontSizes(themeLoader)}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>{props.children}</StyledEngineProvider>
    </ThemeProvider>
  );
}
