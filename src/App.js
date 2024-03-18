import AdminNav from "./admin/header/AdminNav";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// Admin
import Dashboard from "./admin/pages/Dashboard";
import About from "./admin/pages/About";
import Product from "./admin/pages/Product";
import Usernav from "./user/header/Usernav";


// user
import UserAbout from "./user/pages/About";
import Home from "./user/pages/Home";
import Contact from "./user/pages/Contact";
import Users from "./admin/pages/Users";

function App() {
  let root = "admin"

  if ("admin" === root) {
    return (
      <>
        <AdminNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </>
    );
  } else if ("user" === root) {
    return (
      <>
        <Usernav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<UserAbout />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </>
    )
  }
  else {
    return (
      <h1>Not Found</h1>
    )
  }
}

export default App;
