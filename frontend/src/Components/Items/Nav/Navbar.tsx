import { Link } from "react-router-dom";
import { LogoutButton } from "../Buttons/LogoutButton";
import "./index.scss";

export const Navbar = ({ isAuth }: any) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Ecommerce</Link>
        </div>
        <div className="options">
          {isAuth && (
            <div className="user-options">
              <div className="user">
                <Link to="/user">Profile</Link>
              </div>
              <div className="cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
            </div>
          )}
          {!isAuth ? (
            <button className="auth">
              <Link className="login" to="/login">
                Login
              </Link>
            </button>
          ) : (
            <div className="logout">
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
