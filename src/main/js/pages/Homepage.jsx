import React, { useEffect, useState } from "react";
import { Container } from '@mui/material'

import Navbar from "../components/Navbar";
import Personalinfo from "../components/Personalinfo";
import About from "../components/About"

export default function Homepage(props) {
	return (
		<Container disableGutters maxWidth="false" sx={{bgcolor:"#FAFEFF"}}> 
			<Navbar />
			<Personalinfo />
			<About />
		</Container>
	);
}
