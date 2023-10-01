import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Repos from "./pages/Repos";
import Followers from "./pages/Followers";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

function App() {
  const [submittedSearch, setSubmittedSearch] = useState("");

  return (
    <BrowserRouter>
      <Navbar />
      <SearchBar setSubmittedSearch={setSubmittedSearch} />
      <Routes>
        <Route path="/" element={<User submittedSearch={submittedSearch} />} />
        <Route
          path="/repos"
          element={<Repos submittedSearch={submittedSearch} />}
        />
        <Route
          path="/followers"
          element={<Followers submittedSearch={submittedSearch} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
