import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { useUserContext } from "./context/userContext";
function App() {
  const { user } = useUserContext();
  // console.log(user);
  return (
    <Router>
      {user ? <Navbar /> : ""}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        {/* <Route
          path="/"
          element={user ? <Dashboard /> : <UserDetails user={sampleUser} />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
