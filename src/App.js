import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthorRegister from './components/author/AuthorRegister';
import AuthorLogin from './components/author/AuthorLogin';
import ReaderRegister from './components/reader/RegisterRegister';
import ReaderLogin from './components/reader/ReaderLogin';
import AuthorDashboard from './components/author/AuthorDashBoard';
import ReaderDashboard from './components/reader/ReaderDashBoard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="author">
          <Route path="authorRegister" element={<AuthorRegister />} />
          <Route path="authorLogin" element={<AuthorLogin />} />
          <Route path="authorDashBoard" element={<AuthorDashboard />} />
        </Route>
        <Route path="reader">
          <Route path="readerRegister" element={<ReaderRegister />} />
          <Route path="readerLogin" element={<ReaderLogin />} />
          <Route path="readerDashBoard" element={<ReaderDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
