import React, { useEffect, useState } from "react";
import { Container } from '@mui/material'

import Navbar from "../components/Navbar";
import Fileloader from "../components/Fileloader"
import Fileachiever from "../components/Fileachiever"


export default function Filetransfer(props) {
	return (
		<Container disableGutters maxWidth="false" sx={{bgcolor:"#FAFEFF"}}> 
			<Navbar />
			<Fileloader />
			<Fileachiever />
		</Container>
	);
}