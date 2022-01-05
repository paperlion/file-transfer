'use strict';

import * as React from 'react';
import ReactDOM from 'react-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import Navbar from "./components/Navbar.jsx";
import Fileloader from "./components/Fileloader.jsx"

function App() {
  return (
  	<div> 
		<Navbar />
		<Fileloader />
    </div>
  );
}
ReactDOM.render(
	<App/>,
	document.getElementById('react')
)

