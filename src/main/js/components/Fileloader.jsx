import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid} from "@mui/material";

const WELCOME = "Welcome to Robin's Fast File Transfer!"
const SUBTITLE = "upload and achieve files everywhere with 4-character code."

const UPLOADSUCCESS = "Upload Sucess. Your Code Is:";
const SUBUPLOADSUCCESS = "files will be kept for 60 minutes";

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
		if (!currFile) {
			alert("No file selected!")
			return;
		}
		var data = new FormData()
		data.append('file', currFile)
		fetch('/api/file', {
			method: 'POST',
			body: data
		}).then(res => {
			return res.text().then(text=>{
				if (res.ok) {
					setMessage(UPLOADSUCCESS);
					setSubMessage(SUBUPLOADSUCCESS);
					setCode(text);
					setCurrentFile(null);
					setCurrentFileName(null);
					document.getElementById('input-file').value="";
					window.scrollTo({
						top: 0,
					});
				} else {
					//error happens
					alert(text);
				}
			});
		})
	}

	const messageShowCurrFile = (currFile) => {
		if (currFile) { return (
			<Typography
				variant="h2"
				component="div"
				sx={{
					mb: {xs: 2},
					fontSize: {xs: "1rem", md: "1.5rem"},
				}}
			>
				{currFileName}
			</Typography>
		)} else { return (
			<Typography
				variant="h2"
				component="div"
				sx={{
					mb: {xs: 2},
					fontSize: {xs: "1rem", md: "1.5rem"},
				}}
			>
				Click to upload the file. (max size : 10 MB)
			</Typography>
		)}
	} 

	return (
		<Grid container
			spacing={0}
			flexDirection={{ xs: "column"}}
			alignItems="center"
			justifyContent="center"
			style={{minHeight: '75vh'}}
		>
			<Grid item>
				<Typography
			  		component="div"
					sx={{
						mb: {xs: 2},
						fontSize: {xs: "1.5rem", md: "3rem"},
					}}
			  		color="primary"
				>
			  		{message}
				</Typography>
			</Grid>
			{code && <Grid item>
				<Typography
					component="div"
					sx={{
						mb: {xs: 2},
						fontSize: {xs: "2rem", md: "4rem"},
					}}
				>
					{code.toUpperCase()}
				</Typography> 
			</Grid>}
			<Grid item>
				<Typography
					component="div"
					sx={{
						mb: {xs: 2},
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
						border: "1px dashed grey",
						textTransform:'none'}}
				>
					<input
						id="input-file"
						type="file"
						onChange={changeFile}
						hidden
					/>
					{messageShowCurrFile(currFile)}
				</Button>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					onClick={uploadFile}
					size="large"
				>
					Upload
				</Button>
			</Grid>
		</Grid>
	);
}