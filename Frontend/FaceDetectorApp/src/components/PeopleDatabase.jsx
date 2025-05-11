import React from "react";
import { useNavigate } from "react-router-dom";

function PeopleDatabase({ data }) {
  const navigate = useNavigate();

  return (
    <div className="row d-flex justify-content-center text-center">
      <h1 className="mb-5">Database of Persons</h1>
      <div className="col-sm-12 col-md-12 col-lg-12 col-12 my-5">
        <table className="table table-light table-striped me-2 text-center">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First name</th>
              <th scope="col">Surname</th>
              <th scope="col">Age</th>
              <th scope="col">Adress</th>
              <th scope="col">City</th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((onePeople) => (
              <tr key={onePeople.id}>
                <td>{onePeople.id}</td>
                <td>{onePeople.firstName}</td>
                <td>{onePeople.surname}</td>
                <td>{onePeople.age}</td>
                <td>{onePeople.adress}</td>
                <td>{onePeople.city}</td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-warning mx-2"
                    onClick={() => navigate(`/profiles/${onePeople.id}`)}
                  >
                    Show profile
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate(`/edit/${onePeople.id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PeopleDatabase;
