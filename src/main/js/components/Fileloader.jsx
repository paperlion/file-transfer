import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid} from "@mui/material";

const WELCOME = "Welcome to Robin's Fast File Transfer!"
const SUBTITLE = "upload and achieve files everywhere with 4-digit code."

const UPLOADSUCCESS = "Upload Sucess. Your Code Is:";
const SUBUPLOADSUCCESS = "upload another file:";

export default function Fileloader(props) {
	const [message, setMessage] = useState(WELCOME);
	const [subMessage, setSubMessage] = useState(SUBTITLE);
	const [currFileName, setCurrentFileName] = useState(null);
	const [currFile, setCurrentFile] = useState(null);
	const [code, setCode] = useState(null);

	const changeFile = (e) => {
		setCurrentFileName(e.target.files[0].name);
		setCurrentFile(e.target.files[0]);
	};

	const uploadFile = (e) => {
		e.preventDefault();
		var data = new FormData()
		data.append('file', currFile)
		fetch('/file', {
			method: 'POST',
			body: data
		}).then( res => {
			return res.text().then(text=>{
				setMessage(UPLOADSUCCESS);
				setSubMessage(SUBUPLOADSUCCESS);
				setCode(text);
			})
		});
	}

	return (
		<Grid container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh'}}
		>
			<Grid item>
				<Typography
			  		component="div"
					sx={{
						mb: {xs: 2.5},
						fontSize: {xs: "1.5rem", md: "3rem"},
					}}
			  		color="primary"
				>
			  		{message}
				</Typography>
			</Grid>
			{code && <Grid item>
				<Typography
					variant="h2"
					component="div"
					sx={{
						mb: {xs: 2.5},
						fontSize: {xs: "2rem", md: "4rem"},
					}}
				>
					{code}
				</Typography> 
			</Grid>}
			<Grid item>
				<Typography
					variant="h2"
					component="div"
					sx={{
						mb: {xs: 2.5},
						fontSize: {xs: "1rem", md: "1.5rem"},
					}}
				>
					{subMessage}
				</Typography>
			</Grid>
			<Grid item>
				<Button
					component="label"
					style={{
						width : '80vw', 
						height: '40vh', 
						borderRadius: 50, 
						border: "1px dashed grey"}}
				>
					<input
						type="file"
						onChange={changeFile}
						hidden
					/>

					<Typography
						variant="h2"
						component="div"
						sx={{
							mb: {xs: 2.5},
							fontSize: {xs: "1rem", md: "1.5rem"},
						}}
					>
						{currFileName}
					</Typography>
				</Button>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					component="label"
					onClick={uploadFile}
				>
					Upload File
				</Button>
			</Grid>
		</Grid>
	);
}