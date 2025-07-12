import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import LoginIcon from "@mui/icons-material/Login";
import { Fab, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { useGlobals } from "../../hooks/useGlobals";
import MemberService from "../../services/MemberService";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#ffffff",
  },
}));

const ModalImg = styled.img`
  width: 50%;
  height: auto;
  object-fit: cover;
`;

const FormSection = styled(Stack)`
  padding: 50px 40px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  h5 {
    font-weight: 600;
    color: #2c3e50;
  }

  .MuiTextField-root {
    background: #ffffff;
    border-radius: 8px;
  }

  .MuiFab-root {
    box-shadow: none;
    background-color: #3498db;
    color: #fff;
    text-transform: none;
    font-weight: bold;
    padding: 8px 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) handleSignupRequest();
    else if (e.key === "Enter" && loginOpen) handleLoginRequest();
  };

  const handleSignupRequest = async () => {
    try {
      if (!memberNick || !memberPhone || !memberPassword)
        throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick,
        memberPhone,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      handleSignupClose();
      sweetErrorHandling(err);
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (!memberNick || !memberPassword) throw new Error(Messages.error3);

      const loginInput: LoginInput = { memberNick, memberPassword };
      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      handleLoginClose();
      sweetErrorHandling(err);
    }
  };

  const renderForm = (type: "login" | "signup") => (
    <FormSection>
      <Typography variant="h5">{type === "signup" ? "Signup" : "Login"} Form</Typography>
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        onChange={handleUsername}
      />
      {type === "signup" && (
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          onChange={handlePhone}
        />
      )}
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        onChange={handlePassword}
        onKeyDown={handlePasswordKeyDown}
      />
      <Fab
        variant="extended"
        onClick={type === "signup" ? handleSignupRequest : handleLoginRequest}
      >
        <LoginIcon sx={{ mr: 1 }} />
        {type === "signup" ? "Signup" : "Login"}
      </Fab>
    </FormSection>
  );

  return (
    <>
      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>
          <div className={classes.paper} style={{ width: "850px" }}>
            <ModalImg src="/img/gallery-2.jpg" alt="signup" />
            {renderForm("signup")}
          </div>
        </Fade>
      </Modal>

      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={loginOpen}>
          <div className={classes.paper} style={{ width: "750px" }}>
            <ModalImg src="/img/gallery-2.jpg" alt="login" />
            {renderForm("login")}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
