import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import bcrypt from "bcryptjs";

function Signup() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");

  const handleApi = async () => {
    const url = API_URL + "/signup";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = { username, password: hashedPassword, mobile, email };
    
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert("SERVER ERR");
      });
  };

  return (
    <div>
      <Header />
      <div className="p-3 m-3">
        <div>
          <h3 style={{ marginBottom: "10px" }}>Welcome to Signup Page</h3>
          <br></br>
          <label style={{ marginBottom: "5px" }}>USERNAME</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          />
          <br></br>
          <label style={{ marginBottom: "5px" }}>MOBILE</label>
          <input
            className="form-control"
            type="text"
            value={mobile}
            onChange={(e) => {
              setmobile(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          />
          <br></br>
          <label style={{ marginBottom: "5px" }}>EMAIL</label>
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          />
          <br></br>
          <label style={{ marginBottom: "5px" }}>PASSWORD</label>
          <input
            className="form-control"
            type="text"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          />
          <br></br>
        </div>

        <button
          className="btn btn-primary mr-3"
          style={{ marginRight: "10px" }}
          onClick={handleApi}
        >
          {" "}
          SIGNUP{" "}
        </button>
        <Link className="btn btn-primary mr-3" to="/login">
          {" "}
          LOGIN{" "}
        </Link>
      </div>
    </div>
  );
}

export default Signup;
