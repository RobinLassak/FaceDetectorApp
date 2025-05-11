import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
      <h4 className="mb-4 text-center">Face Detector</h4>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/Search">
            Search
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/Profiles">
            Profiles
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/Edit">
            Edit
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/Update">
            Update
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/People-Database">
            People Database
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
