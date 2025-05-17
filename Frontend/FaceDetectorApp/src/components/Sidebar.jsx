import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
      <h4 className="mb-4 text-center">Face Detector</h4>

      {/*Prvni Accordion*/}
      <div className="accordion" id="sidebarAccordion">
        <div className="accordion-item bg-dark border-0">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed bg-dark text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#searchMenu"
            >
              Search
            </button>
          </h2>
          <div
            id="searchMenu"
            className="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion"
          >
            <div className="accordion-body p-0">
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white" to="/SearchByPhoto">
                    Photo
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white" to="/SearchByVideo">
                    Video
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*Druhy Accordion*/}
      <div className="accordion" id="sidebarAccordion2">
        <div className="accordion-item bg-dark border-0">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed bg-dark text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#managementMenu"
            >
              Management
            </button>
          </h2>
          <div
            id="managementMenu"
            className="accordion-collapse collapse"
            data-bs-parent="#sidebarAccordion2"
          >
            <div className="accordion-body p-0">
              <ul className="nav nav-pills flex-column">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
