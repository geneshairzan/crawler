import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Typography, Button } from "@mui/material";
import Context from "component/provider/context";
import { min } from "./helper";
import axios from "axios";
import { fetcher } from "./useForm";

//https://codesandbox.io/s/thyb0?file=/pages/index.js:253-268

// const fetcher = (path, data) => {
//   setTimeout(() => {
//     axios
//       .post(path, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           console.log(res.data);
//           return "succ";
//         }
//       })
//       .catch((error) => {
//         // setisLoading(false);
//         return error;
//       });
//   }, 2000);
//   return "ok";
// };

// async function getData(path, data) {
//   try {
//     const x = await axios.post(path, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("x", x);
//     return x;
//   } catch (error) {
//     return error;
//   }
// }

export default function App({ v, e }) {
  const hiddenFileInput = React.useRef(null);
  const [file, setfile] = useState();

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setfile(event.target.files[0]);
      // const i = event.target.files[0];
      // const body = new FormData();
      // body.append("image", i);
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  async function handleSubmit(params) {
    const formData = new FormData();
    formData.append("file", file);

    let goo = await fetcher("/api/upload", formData);
    // console.log("malop", await myloop());
  }

  return (
    <Stack>
      <label htmlFor="contained-button-file">
        <input
          ref={hiddenFileInput}
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
      </label>
      <Button variant="contained" component="span" onClick={handleClick}>
        Upload
      </Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </Stack>
  );
}
