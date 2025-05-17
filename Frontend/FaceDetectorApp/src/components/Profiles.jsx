import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Profiles({ data, deletePerson }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);

  useEffect(() => {
    if (id && data.length > 0) {
      const personId = parseInt(id);
      const found = data.find((p) => p.id === personId);
      if (found) {
        setPerson(found);
      } else {
        setPerson(undefined);
      }
    }
  }, [id, data]);
  if (!id) {
    return (
      <div className="container text-center">
        <h1 className="mb-5">Profiles</h1>
        <h4 className="mb-3">Choose person:</h4>
        <select
          className="form-select w-50 mx-auto"
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId) {
              navigate(`/profiles/${selectedId}`);
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>
            -- Choose person --
          </option>
          {data.map((p) => (
            <option key={p.id} value={p.id}>
              {p.firstName} {p.surname}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (person === undefined) {
    return <div className="text-center mt-5">Person not found.</div>;
  }

  if (person === null) {
    return <div className="text-center mt-5">Loading data...</div>;
  }
  return (
    <div className="container">
      <h1 className="mb-5">Profile</h1>
      <div className="row gx-5 align-items-start">
        <div className="col-12 col-lg-6 col-md-12 col-sm-12 mb-4 mb-lg-4 mb-md-4">
          <div
            className={`rounded-3 w-100 h-100 d-flex align-items-center justify-content-center overflow-hidden ${
              person.photo ? "" : "border border-2"
            }`}
            style={{
              backgroundColor: person.photo ? "#ffffff" : "#e9ecef",
              minHeight: "540px",
              minWidth: "400px",
            }}
          >
            {person.photo ? (
              <img
                src={`http://localhost:5000${person.photo}`}
                alt="Person"
                className="img-fluid"
                style={{
                  height: "540px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <span className="text-muted">No photo available</span>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-6 col-md-12 col-sm-12">
          <table
            className="table table-light table-striped text-start"
            style={{ minHeight: "540px" }}
          >
            <tbody>
              <tr>
                <th scope="row">First Name</th>
                <td>{person.firstName}</td>
              </tr>
              <tr>
                <th scope="row">Surname</th>
                <td>{person.surname}</td>
              </tr>
              <tr>
                <th scope="row">Age</th>
                <td>{person.age}</td>
              </tr>
              <tr>
                <th scope="row">Adress</th>
                <td>{person.adress}</td>
              </tr>
              <tr>
                <th scope="row">City</th>
                <td>{person.city}</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
                  fuga, voluptatibus quas ut libero praesentium adipisci est
                  debitis provident tenetur. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Placeat accusamus rerum natus
                  sapiente accusantium nihil blanditiis atque a dolore quo.
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex gap-3 mt-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                deletePerson(person.id), navigate(`/people-database`);
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/people-database`)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
