import React, { useEffect, useState } from "react";
import { Container } from '@mui/material'

import Navbar from "../components/Navbar";
import CalculationTable from "../components-bill/CalculationTable"

export default function BillSpliter(props) {
	return (
		<Container disableGutters maxWidth="false" sx={{bgcolor:"#FAFEFF"}}> 
			<Navbar />
			<CalculationTable />
		</Container>
	);
}