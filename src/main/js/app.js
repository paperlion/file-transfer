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

import FileTransfer from "./pages/FileTransfer"
import Homepage from "./pages/Homepage"
import Notfound from "./pages/Notfound"
import BillSpliter from "./pages/BillSpliter"
import TimeLine from "./pages/TimeLine"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, lightBlue, indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    // primary: indigo,
  },
  breakpoints: {
	  values: {
	    xs: 0,
	    sm: 600,
	    md: 1000,
	    lg: 1200,
	    xl: 1536,
	  },
	}
});

function App() {
  return (
  	<ThemeProvider theme={theme}>
	  	<BrowserRouter>
		    <Routes>
		     	<Route path="/" element={<Homepage />} />
		     	<Route path="file" element={<FileTransfer />} />
		     	<Route path="bill" element={<BillSpliter />} />
		     	<Route path="timeline" element={<TimeLine />} />
		     	<Route path="*" element={<Notfound status={404}/>}/>
		    </Routes>
	  	</BrowserRouter>
	  </ThemeProvider>
  );
}
ReactDOM.render(
	<App/>,
	document.getElementById('react')
)

