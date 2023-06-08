import React, { FormEvent, useEffect, useState } from "react";
import { AddPassword } from "../helphers/api";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router";
import Backdrop from "@mui/material/Backdrop";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { ListPasswords } from "./list/list";
import {encrypt} from '../helphers'

import { CustomizedProgressBars } from "../element";
export const Home = function () {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      setLoading(false);
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
    console.log(e.target);
    console.log(e.currentTarget);
    e.preventDefault();
    e.stopPropagation();

    const encryptText = prompt('Enter password to encrypt') as string
   
    const hint = e.currentTarget.elements.namedItem("hint") as HTMLInputElement;
    const password = e.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const name = e.currentTarget.elements.namedItem("name") as HTMLInputElement;
    const email = e.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    console.log(encrypt(password.value,encryptText))
    const url = e.currentTarget.elements.namedItem("url") as HTMLInputElement;
    const response = await AddPassword({
      password: encrypt(password.value,encryptText),
      url: url.value,
      name: name.value,
      hint: hint.value,
      email: email.value,
    });
    console.log(response.data);
    //  navigate('/password')
    handleClose();

    console.log(url.value, password.value, "jjj");
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      {loading ? (
        <CustomizedProgressBars />
      ) : (
        <>
          <Button onClick={handleOpen}>Add New</Button>
          <ListPasswords />
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Box sx={{ ...style, width: 200 }}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Box>
                    <TextField
                      id="text_url"
                      name="url"
                      label="url"
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="text_name"
                      name="name"
                      label="name"
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="text_hint"
                      name="hint"
                      label="hint"
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="text_email"
                      name="email"
                      label="email/ username"
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="text_password"
                      name="password"
                      label="password"
                      variant="outlined"
                    />
                    <Button type="submit"> Add new</Button>
                  </Box>
                </FormControl>
              </form>
            </Box>
          </Modal>
          
        </>
      )}
    </div>
  );
};
