import { NavLink } from "react-router-dom";

function TopNav() {
  const linkBase =
    "px-4 py-2 rounded text-sm font-medium transition-colors duration-200";

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#322625" }}>
      <div className="container-fluid">
        <span className="navbar-brand text-white fw-semibold">
          Dashboard <span style={{ color: "#fdc936" }}>Astudio</span>
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  "nav-link " +
                  (isActive ? "bg-warning text-dark rounded" : "text-white")
                }
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  "nav-link " +
                  (isActive ? "bg-warning text-dark rounded" : "text-white")
                }
              >
                Products
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
