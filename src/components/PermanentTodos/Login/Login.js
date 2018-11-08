import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Google from "@material-ui/icons/GTranslate";
import AuthContext from "../../../Context/auth";
export default function Login() {
  const { googleLogin } = useContext(AuthContext);

  return (
    <div
      style={{
        height: "91.3vh",
        textAlign: "center",
        background: "rgba(0,0,0,0.6)"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "38%"
        }}
      >
        <Button
          onClick={googleLogin}
          style={{ fontSize: 28 }}
          fullWidth
          variant="contained"
          color="secondary"
        >
          LOGIN WITH GOOGLE &nbsp; &nbsp;
          <Google />
        </Button>
      </div>
    </div>
  );
}
