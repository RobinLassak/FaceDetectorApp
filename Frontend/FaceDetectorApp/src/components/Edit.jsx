import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edit({ data, setPeopleData }) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      setPhotoPreview(url);

      setPhotoFile(file);
    }
  };

  if (!id) {
    return (
      <div className="container text-center">
        <h1 className="mb-5">Edit Person</h1>
        <h4 className="mb-3">Choose person for edit:</h4>
        <select
          className="form-select w-50 mx-auto"
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId) {
              navigate(`/edit/${selectedId}`);
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

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("person", JSON.stringify(person));
      if (photoFile) {
        formData.append("photo", photoFile);
      }
      const response = await fetch(
        `http://localhost:5000/edit-person/${person.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Chyba při ukládání osoby");
      }

      setPeopleData((prev) =>
        prev.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
      );

      navigate("/people-database");
    } catch (error) {
      console.error("Chyba při komunikaci s backendem:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-5">Edit Person</h1>
      <div className="row justify-content-center align-items-stretch text-start">
        <div className="col-12 col-lg-4 col-md-6 col-sm-12 mb-3 me-5 ms-5 d-flex flex-column">
          <label htmlFor="photo" className="form-label">
            Upload Photo:
          </label>
          <div
            className={`flex-grow-1 rounded-3 w-100 mb-3 ${
              person.photo || photoPreview ? "" : "border border-2"
            }`}
            style={{
              minHeight: "300px",
              backgroundColor: person.photo ? "#ffffff" : "#e9ecef",
            }}
          >
            {person.photo || photoPreview ? (
              <img
                src={photoPreview || `http://localhost:5000${person.photo}`}
                alt="Person"
                className="img-fluid"
                style={{
                  height: "380px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <span className="text-muted">No photo available</span>
            )}
          </div>
          <input
            type="file"
            className="form-control"
            id="photo"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
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
              value={person.firstName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Surname:
            </label>
            <input
              type="text"
              className="form-control"
              name="surname"
              id="surname"
              value={person.surname || ""}
              onChange={handleChange}
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
              value={person.age || ""}
              onChange={handleChange}
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
              value={person.adress || ""}
              onChange={handleChange}
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
              value={person.city || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-danger mx-2"
              onClick={handleSubmit}
            >
              Change
            </button>
            <button
              type="button"
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

export default Edit;
