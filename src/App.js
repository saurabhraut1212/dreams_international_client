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
import AddNewBook from './components/author/AddNewBook';
import GetAllBooks from './components/author/GetAllBooks';
import EditBook from './components/author/EditBook';

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
          <Route path="addNewBook" element={<AddNewBook />} />
          <Route path="allBooks/:authorId" element={<GetAllBooks />} />
          <Route path="editBook/:bookId" element={<EditBook />} />
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
