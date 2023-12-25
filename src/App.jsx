import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import redberryLogo from "./assets/redberry-logo.png";
import blogPagePhoto from "./assets/blog-page-photo.png";
import { LoginModal } from "../components/LoginModal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateBlog } from "./pages/CreateBlog";
import { HomePage } from "./pages/HomePage";
import { CreateBlogHomePage } from "./pages/CreateBlogHomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/create-blog-home-page"
            element={<CreateBlogHomePage />}
          />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="*" element={<h1> PAGE NOT FOUND! </h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
