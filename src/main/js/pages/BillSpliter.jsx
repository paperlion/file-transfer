import React, { useEffect, useState } from "react";
import { Container } from '@mui/material'

import Navbar from "../components/Navbar";
import CalculationTable from "../components-bill/CalculationTable"
import TableHeader from "../components-bill/TableHeader";
import Copyright from "../components/Copyright"
import BackgroundImage from "../components/BackgroundImage"

export default function BillSpliter(props) {

	useEffect(() => {
	    const onbeforeunloadFn = (e) => {
	      e.returnValue = 'Things will be lost if you exist.'
	    }

	    window.addEventListener('beforeunload', onbeforeunloadFn);
	    return () => {
	      window.removeEventListener('beforeunload', onbeforeunloadFn);
	    }
	}, []);

	return (
		<Container disableGutters maxWidth="false"> 
			<Navbar />
			<TableHeader/>
			<CalculationTable />
			<Copyright />
		</Container>
	);
}