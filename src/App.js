import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Navbar';
import './App.css';

import ProductDisplay from './ProductDisplay';
import FileUpload from './FileUpload';
import AzUploadDash from './AzUploadDash';

function App() {
  return (
    <>
        <HashRouter >
<header>
<div class="flex-container">
            <div class="logo">
            <a id="anchor1" href="/">Asins</a><a id="anchor2" href="/"><i>Manager</i></a>
            </div>
            <Navbar />
          </div>
        </header>
  <Switch>
          <Route exact path="/">
          <ProductDisplay/>
          </Route>
          <Route path="/fileUploader">
            <FileUpload/>
          </Route>
        </Switch>

        
<footer style={{height:"4rem",backgroundColor:"lightskyblue",marginTop:"2rem",padding:"1rem"}}>
&copy; ShopOC 2020
</footer>


</HashRouter>
</>
  );
}

export default App;
