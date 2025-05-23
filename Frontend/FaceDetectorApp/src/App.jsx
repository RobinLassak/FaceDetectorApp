import React, { useState } from "react";
import { Routes, Route, data } from "react-router-dom";
import Layout from "./Layout";
import Edit from "./components/Edit";
import Update from "./components/Update";
import Search from "./components/Search";
import PeopleDatabase from "./components/PeopleDatabase";
import DatabaseOfPeople from "./DatabaseOfPeople.json";
import Profiles from "./components/Profiles";
import SearchByVideo from "./components/SearchByVideo";
import SearchByPhoto from "./components/SearchByPhoto";

function App() {
  const [peopleData, setPeopleData] = useState(DatabaseOfPeople.people);
  const deletePerson = async (idecko) => {
    try {
      const response = await fetch(
        `http://localhost:5000/delete-person/${idecko}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Chyba při mazání osoby");
      }

      const updateList = peopleData.filter(
        (onePerson) => onePerson.id !== idecko
      );
      setPeopleData(updateList);
    } catch (error) {
      console.error("Mazání selhalo:", error);
    }
  };
  const updatePerson = async (newPerson, photoFile) => {
    try {
      const formData = new FormData();
      formData.append("photo", photoFile);
      formData.append("person", JSON.stringify(newPerson));
      const response = await fetch("http://localhost:5000/add-person", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Chyba při ukládání osoby");
      }

      setPeopleData((prev) => [...prev, newPerson]);
    } catch (error) {
      console.error("Chyba:", error);
    }
  };
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
        <Route path="SearchByPhoto" element={<SearchByPhoto />} />
        <Route path="SearchByVideo" element={<SearchByVideo />} />
        <Route
          path="profiles"
          element={<Profiles data={peopleData} setPeopleData={setPeopleData} />}
        />
        <Route
          path="profiles/:id"
          element={<Profiles data={peopleData} deletePerson={deletePerson} />}
        />
        <Route
          path="edit/:id"
          element={<Edit data={peopleData} setPeopleData={setPeopleData} />}
        />
        <Route
          path="edit"
          element={<Edit data={peopleData} setPeopleData={setPeopleData} />}
        />
        <Route
          path="update"
          element={<Update updatePerson={updatePerson} data={peopleData} />}
        />
        <Route
          path="people-database"
          element={<PeopleDatabase data={peopleData} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
