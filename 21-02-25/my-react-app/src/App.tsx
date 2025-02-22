import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/search">Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<h2>Not Found 404</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
