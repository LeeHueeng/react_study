import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Heading from "./Component/Heading";
import Upload from "./Component/Upload";
import List from "./Component/List";

function App() {
  const [ContentList, setContentList] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Heading />
        <Routes>
          <Route
            path="/list"
            element={
              <List ContentList={ContentList} setContentList={setContentList} />
            }
          />
          <Route
            path="/upload"
            element={
              <Upload
                ContentList={ContentList}
                setContentList={setContentList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
