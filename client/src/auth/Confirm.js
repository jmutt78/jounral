import React from "react";
import notRequireAuth from "./notRequireAuth.js";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";

class Confirm extends React.Component {
  render() {
    return (
      <div
        className="card"
        style={{ width: "40%", margin: "0 auto", padding: "50px" }}
      >
        <Card align="center" style={{ padding: "5px" }}>
          <h2 align={"center"}>Sucess! </h2>
          <p align={"center"}>Your account was confirmed.</p>
          <Button component={Link} to="/login" fullWidth variant="contained">
            Login!
          </Button>

          <div className="login-input" />
          <div>
            <div>
              <br />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const wrapper = notRequireAuth(Confirm);

export default wrapper;
