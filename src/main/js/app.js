'use strict';

import * as React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  NoMatch
} from "react-router-dom";

import { Container } from '@mui/material'

import Filetransfer from "./pages/Filetransfer"
import Homepage from "./pages/Homepage"
import Notfound from "./pages/Notfound"

function App() {
  return (
  	<BrowserRouter>
	    <Routes>
	     	<Route path="/" element={<Homepage />} />
	     	<Route path="tool" element={<Filetransfer />} />
	     	<Route path="*" element={<Notfound status={404}/>}/>
	    </Routes>
  	</BrowserRouter>
  );
}
ReactDOM.render(
	<App/>,
	document.getElementById('react')
)

