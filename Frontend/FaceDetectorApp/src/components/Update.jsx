import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Update({ updatePerson, data }) {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [newPerson, setNewPerson] = useState({
    id: data.length > 0 ? Math.max(...data.map((person) => person.id)) + 1 : 1,
    firstName: "",
    surname: "",
    age: 0,
    adress: "",
    city: "",
  });
  const validate = () => {
    if (
      newPerson.firstName === "" ||
      newPerson.surname === "" ||
      newPerson.age < 0 ||
      newPerson.age === "" ||
      newPerson.adress === "" ||
      newPerson.city === ""
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  useEffect(() => {
    validate();
  }, [newPerson]);

  const handleNew = (e) => {
    const source = e.target.name;
    const value = e.target.value;
    let updatePerson;
    switch (source) {
      case "firstName":
        updatePerson = { ...newPerson, firstName: value };
        break;
      case "surname":
        updatePerson = { ...newPerson, surname: value };
        break;
      case "age":
        updatePerson = { ...newPerson, age: value };
        break;
      case "adress":
        updatePerson = { ...newPerson, adress: value };
        break;
      case "city":
        updatePerson = { ...newPerson, city: value };
        break;
      default:
        break;
    }
    setNewPerson(updatePerson);
  };
  const resetuj = () => {
    const temp = {
      firstName: "",
      surname: "",
      age: 0,
      adress: "",
      city: "",
    };
    setNewPerson(temp);
  };
  return (
    <div className="container">
      <h1 className="text-center mb-5">Update Person</h1>
      <div className="row justify-content-center align-items-stretch text-start">
        <div className="col-12 col-lg-4 col-md-6 col-sm-12 mb-3 me-5 ms-5 d-flex flex-column">
          <label htmlFor="photo" className="form-label">
            Upload Photo:
          </label>
          <div
            className="flex-grow-1 border border-2 rounded-3 w-100 mb-3"
            style={{ minHeight: "300px", backgroundColor: "#e9ecef" }}
          ></div>
          <input type="file" className="form-control" id="photo" />
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              id="firstName"
              value={newPerson.firstName}
              onChange={handleNew}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="secondName" className="form-label">
              Surname:
            </label>
            <input
              type="text"
              className="form-control"
              name="surname"
              id="surname"
              value={newPerson.surname}
              onChange={handleNew}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              name="age"
              id="age"
              value={newPerson.age}
              onChange={handleNew}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adress" className="form-label">
              Adress:
            </label>
            <input
              type="text"
              className="form-control"
              name="adress"
              id="adress"
              value={newPerson.adress}
              onChange={handleNew}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City:
            </label>
            <input
              type="text"
              className="form-control"
              name="city"
              id="city"
              value={newPerson.city}
              onChange={handleNew}
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-danger mx-2"
              onClick={() => {
                updatePerson(newPerson), resetuj();
              }}
              disabled={!isValid}
            >
              Update
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

export default Update;
