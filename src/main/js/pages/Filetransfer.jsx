import React, { useEffect, useState } from "react";
import { Container } from '@mui/material'

import Navbar from "../components/Navbar";
import Fileloader from "../components/Fileloader"
import Fileachiever from "../components/Fileachiever"
import Copyright from "../components/Copyright"


export default function Filetransfer(props) {
	return (
		<Container disableGutters maxWidth="false" sx={{bgcolor:"#FAFEFF"}}> 
			<Navbar />
			<Fileloader />
			<Fileachiever />
			<Copyright />
		</Container>
	);
}