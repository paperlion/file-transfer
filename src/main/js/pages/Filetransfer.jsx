import React, { useEffect, useState } from "react";
import { Container } from '@mui/material'

import Navbar from "../components/Navbar";
import FileLoader from "../components-file/FileLoader"
import FileAchiever from "../components-file/FileAchiever"
import Copyright from "../components/Copyright"
import BackgroundImage from "../components/BackgroundImage"


export default function FileTransfer(props) {
	return (
		<Container disableGutters maxWidth="false"> 
			<Navbar />
			<FileLoader />
			<FileAchiever />
			<Copyright />
		</Container>
	);
}