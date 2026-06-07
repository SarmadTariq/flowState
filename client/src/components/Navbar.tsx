import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav>

      {token && (
        <>
          <Link to="/">
            Dashboard
          </Link>

          {" | "}

          <Link to="/board">
            Board
          </Link>

          {" | "}
        </>
      )}

      {!token ? (
        <>
          <Link to="/login">
            Login
          </Link>

          {" | "}

          <Link to="/register">
            Register
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
        >
          Logout
        </button>
      )}

    </nav>
  );
}

export default Navbar;