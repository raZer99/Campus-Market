import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleApi = async () => {
    const emailPattern = /@bmsit\.in$/; // Regular expression to check email ending with @bmsit.in

    // Validate email
    if (!emailPattern.test(email)) {
      alert("Email must end with @bmsit.in");
      return;
    }

    // Check if username already exists
    try {
      const response = await axios.get(`${API_URL}/get-user-by-username/${username}`);
      if (response.data.userExists) {
        alert("Username already exists. Please choose a different username.");
        return;
      }
    } catch (err) {
      alert("Error checking username availability");
      console.error("Error checking username availability:", err);
      return;
    }

    // Proceed with signup request
    try {
      const url = `${API_URL}/signup`;
      const data = { username, password, mobile, email }; // Send plain password

      const response = await axios.post(url, data);
      if (response.data.message) {
        alert(response.data.message);
      }
    } catch (error) {
      alert("SERVER ERR");
      console.error("Signup error:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-3 m-3">
        <div>
          <h3 style={{ marginBottom: "10px" }}>Welcome to Signup Page</h3>
          <br />
          <label style={{ marginBottom: "5px" }}>USERNAME</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <br />
          <label style={{ marginBottom: "5px" }}>MOBILE</label>
          <input
            className="form-control"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <br />
          <label style={{ marginBottom: "5px" }}>EMAIL</label>
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <br />
          <label style={{ marginBottom: "5px" }}>PASSWORD</label>
          <input
            className="form-control"
            type="password" // Use 'password' type for better security
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <br />
        </div>

        <button
          className="btn btn-primary mr-3"
          style={{ marginRight: "10px" }}
          onClick={handleApi}
        >
          SIGNUP
        </button>
        <Link className="btn btn-primary mr-3" to="/login">
          LOGIN
        </Link>
      </div>
    </div>
  );
}

export default Signup;
