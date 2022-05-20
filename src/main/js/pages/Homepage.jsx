import React, { useEffect, useState } from "react";
import { Container } from '@mui/material'

import Navbar from "../components/Navbar";
import PersonInfo from "../components-home/PersonInfo";
import About from "../components-home/About"
import Copyright from "../components/Copyright"

export default function Homepage(props) {
	return (
		<Container disableGutters maxWidth="false" sx={{bgcolor:"#FAFEFF"}}> 
			<Navbar />
			<PersonInfo />
			<About />
			<Copyright />
		</Container>
	);
}
