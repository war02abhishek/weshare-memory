import React from "react";
import { Container} from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth"
import {BrowserRouter,Routes,Route,Navigate,Redirect,Link} from "react-router-dom";//switch is replaced by routes
import PostDetails from './components/PostDetails/PostDetails'


const App = () => {

 const user = JSON.parse(localStorage.getItem("profile"));
// console.log(user);
return (
  <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        {/* To keep the history clean, you should set replace prop. This will avoid
        extra redirects after the user click back. */}

        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* if user is logged in and if he goes to "/auth" he will redirect to posts ie home page */}
        <Route
          path="/auth"
          element={(!user ? <Auth /> : <Navigate to="/posts" replace />)}
        />
      </Routes>
    </Container>
  </BrowserRouter>
);

};

export default App;

