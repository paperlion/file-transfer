import React, { useEffect, useState } from "react";
import { Container } from '@mui/material'

import Navbar from "../components/Navbar";
import FileLoader from "../components-file/FileLoader"
import FileAchiever from "../components-file/FileAchiever"
import Copyright from "../components/Copyright"


export default function FileTransfer(props) {
	return (
		<Container disableGutters maxWidth="false" sx={{bgcolor:"#FAFEFF"}}> 
			<Navbar />
			<FileLoader />
			<FileAchiever />
			<Copyright />
		</Container>
	);
}