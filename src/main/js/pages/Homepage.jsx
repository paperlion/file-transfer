import React, { useEffect, useState } from "react";
import { Container } from '@mui/material'

import Navbar from "../components/Navbar";
import PersonInfo from "../components-home/PersonInfo";
import About from "../components-home/About"
import Copyright from "../components/Copyright"
import BackgroundImage from "../components/BackgroundImage"

export default function Homepage(props) {
	return (
		<Container disableGutters maxWidth="false"> 
			<BackgroundImage />
			<Navbar />
			<PersonInfo />
			<About />
			<Copyright />
		</Container>
	);
}
