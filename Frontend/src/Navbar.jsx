import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#6a0dad" }}>
      <div className="container">
        <Link className="navbar-brand text-white fs-4 fw-bold" to="/">المتجر</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/register">التسجيل</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/login">تسجيل الدخول</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/orders">طلباتي</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
