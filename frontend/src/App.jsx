import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <div>
      <h1>Student Hub</h1>
      <nav>
        <Link to="/">Home</Link>
        <span> </span>
        <Link to="/add">Add Student</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
