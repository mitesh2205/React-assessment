// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
