'use strict';

import * as React from 'react';
import ReactDOM from 'react-dom';

import { Container } from '@mui/material'

import Navbar from "./components/Navbar";
import Fileloader from "./components/Fileloader"
import Fileachiever from "./components/Fileachiever"

function App() {
  return (
  	<Container disableGutters maxWidth="false" sx={{bgcolor:"#DFF6FF"}}> 
		<Navbar />
		<Fileloader />
		<Fileachiever />
    </Container>
  );
}
ReactDOM.render(
	<App/>,
	document.getElementById('react')
)

