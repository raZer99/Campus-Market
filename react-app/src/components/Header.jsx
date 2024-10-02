// import { Link, useNavigate } from "react-router-dom";
// import styles from "../styles/header.module.css";
// import { FaSearch } from "react-icons/fa";
// import { useState } from "react";

// function Header(props) {
//   const [loc, setLoc] = useState(null);
//   const [showOver, setShowOver] = useState(false);
  
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   const handleLoginRedirect = () => {
//     navigate("/login"); // Redirect to login page on button click
//   };

//   return (
//     <div className={styles.headerContainer}>
//       <div className={styles.header}>
//         <Link
//           className={styles.links}
//           to="/"
//           style={{
//             textDecoration: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             color: "#fff",
//             background: "#4CAF50", // Home button background color
//             border: "1px solid #4CAF50",
//             transition: "background 0.3s ease",
//           }}
//           onMouseOver={(e) =>
//             (e.target.style.background = "#45a049")
//           }
//           onMouseOut={(e) =>
//             (e.target.style.background = "#4CAF50")
//           }
//         >
//           HOME
//         </Link>

//         <input
//           className={styles.search}
//           placeholder="Search CampusMart"
//           type="text"
//           value={props && props.search}
//           onChange={(e) =>
//             props.handlesearch && props.handlesearch(e.target.value)
//           }
//         />

//         <button
//           className={styles.searchBtn}
//           onClick={() => props.handleClick && props.handleClick()}
//         >
//           <FaSearch />
//         </button>
//       </div>

//       {!!localStorage.getItem("token") && (
//         <div className={styles.buttonSection}>
//           <Link to="/add-product">
//             <button className={styles.logoutBtn}>ADD PRODUCT</button>
//           </Link>
//           <Link to="/liked-products">
//             <button className={styles.logoutBtn}>FAVOURITES</button>
//           </Link>
//           <Link to="/my-products">
//             <button className={styles.logoutBtn}>MY ADS</button>
//           </Link>
//         </div>
//       )}

//       <div
//         className={styles.userIcon}
//         onClick={() => setShowOver(!showOver)}
//       >
//         👤
//       </div>

//       {showOver && (
//         <div className={styles.dropdown}>
//           {!localStorage.getItem("token") ? (
//             <button className={styles.loginBtn} onClick={handleLoginRedirect}>
//               LOGIN
//             </button>
//           ) : (
//             <button className={styles.logoutBtn} onClick={handleLogout}>
//               LOGOUT
//             </button>
//           )}
//         </div>
//       )}

//       {/* Signup button at the bottom of the black bar */}
//       <div className={styles.signup}>
//         <Link to="/signup">
//           <button className={styles.signupBtn}>SIGN UP</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Header;


import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/header.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function Header(props) {
  const [showOver, setShowOver] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login"); // Redirect to login after logout
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Link
          className={styles.links}
          to="/"
          style={{
            textDecoration: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            color: "#fff",
            background: "#4CAF50", // Home button background color
            border: "1px solid #4CAF50",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#45a049")}
          onMouseOut={(e) => (e.target.style.background = "#4CAF50")}
        >
          HOME
        </Link>

        <input
          className={styles.search}
          placeholder="Search CampusMart"
          type="text"
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
        />

        <button
          className={styles.searchBtn}
          onClick={() => props.handleClick && props.handleClick()}
        >
          <FaSearch />
        </button>
      </div>

      {isLoggedIn && (
        <div className={styles.buttonSection}>
          <Link to="/add-product">
            <button className={styles.logoutBtn}>ADD PRODUCT</button>
          </Link>
          <Link to="/liked-products">
            <button className={styles.logoutBtn}>FAVOURITES</button>
          </Link>
          <Link to="/my-products">
            <button className={styles.logoutBtn}>MY ADS</button>
          </Link>
        </div>
      )}

      {/* User Icon */}
      <div className={styles.userIcon} onClick={() => setShowOver(!showOver)}>
        👤
      </div>

      {showOver && (
        <div className={styles.dropdown}>
          {!isLoggedIn ? (
            <button className={styles.loginBtn} onClick={handleLoginRedirect}>
              LOGIN
            </button>
          ) : (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              LOGOUT
            </button>
          )}
        </div>
      )}

      {/* Conditionally render Signup or Logout based on login status */}
      <div className={styles.signup}>
        {!isLoggedIn ? (
          <Link to="/signup">
            <button className={styles.signupBtn}>SIGN UP</button>
          </Link>
        ) : (
          <button className={styles.signupBtn} onClick={handleLogout}>
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
