import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import AuthorRegister from './components/author/AuthorRegister';
import AuthorLogin from './components/author/AuthorLogin';
import ReaderLogin from './components/reader/ReaderLogin';
import AuthorDashboard from './components/author/AuthorDashBoard';
import ReaderDashboard from './components/reader/ReaderDashBoard';
import AddNewBook from './components/author/AddNewBook';
import GetAllBooks from './components/author/GetAllBooks';
import EditBook from './components/author/EditBook';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ReaderRegister from './components/reader/ReaderRegister';
import TopRatedBooks from './components/reader/TopRatedBooks';
import ReaderProtectedRoute from './components/auth/ReaderProtectedRoute';
import BooksByAuthor from './components/reader/BooksByAuthor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="author">
          <Route path="authorRegister" element={<AuthorRegister />} />
          <Route path="authorLogin" element={<AuthorLogin />} />

          <Route path="authorDashBoard" element={<ProtectedRoute><AuthorDashboard /></ProtectedRoute>} />
          <Route path="addNewBook" element={<ProtectedRoute><AddNewBook /></ProtectedRoute>} />
          <Route path="allBooks/:authorId" element={<ProtectedRoute><GetAllBooks /></ProtectedRoute>} />
          <Route path="editBook/:bookId" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
        </Route>

        <Route path="reader">
          <Route path="readerRegister" element={<ReaderRegister />} />
          <Route path="readerLogin" element={<ReaderLogin />} />


          <Route path="topRatedBooks" element={<ReaderProtectedRoute><TopRatedBooks /></ReaderProtectedRoute>} />
          <Route path="readerDashBoard" element={<ReaderProtectedRoute><ReaderDashboard /></ReaderProtectedRoute>} />
          <Route path="booksByAuthor" element={<ReaderProtectedRoute><BooksByAuthor /></ReaderProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
