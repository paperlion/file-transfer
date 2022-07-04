import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {Box, Container, Button, Link, Typography, Input, Grid, 
	TextField, ToggleButton, ToggleButtonGroup, TextareaAutosize} from "@mui/material";

import FileAvatar from "./FileAvatar"

const WELCOME = "Welcome to Robin's Fast File Transfer!"
const SUBTITLE = "Upload and achieve files/text everywhere with 4-character code."

const UPLOADSUCCESS = "Upload Sucess. Your Code Is:";
const UPLOADFAILED = "Upload Failed. Error Status Code is:";
const UPLOADPARTSUCCESS = "Parts Of Files Uploaded Successfully. Your Code Is:";
const SUBUPLOADSUCCESS = "(Files/text will be kept for 60 minutes)";
const SUBUPLOADFAILED = "Please check you don't upload a directory or a too large file, then try again.";

const FILE = 0;
const TEXT = 1;

const useStyles = makeStyles({
	uploadButton : {
		width : '80vw', 
		minHeight: '40vh', 
		borderRadius: 50, 
		border: "1px dashed grey",
		textTransform:'none',
	}
})

export default function FileLoader(props) {
	const [message, setMessage] = useState(WELCOME);
	const [subMessage, setSubMessage] = useState(SUBTITLE);
	const [currFiles, setCurrentFiles] = useState([]);
	const [code, setCode] = useState(null);

	const [inputType, setInputType] = useState(FILE);

	const [currText, setCurrText] = useState(null);

	const classes = useStyles();

	const addFile = (file) => {
		setCurrentFiles([...currFiles, file]);
	};

	const addFiles = (files) => {
		setCurrentFiles([...currFiles, ...files]);
	}

	const removeFile = (index) => {
		currFiles.splice(1,1)
		setCurrentFiles(currFiles)
	}

	const cleanFiles = () => {
		setCurrentFiles([])
	}

	const changeText = (e) => {
		setCurrText(e.target.value);
	}

	const inputFile = (e) => {
		addFile(e.target.files[0])
		document.getElementById('input-file').value="";
	}

	const uploadContents = (e) => {
		e.preventDefault();
		if (inputType == FILE){
			console.log(currFiles)
			if (currFiles.length == []) {
				alert("No file selected!")
				return;
			}

			// let groupId = Math.random().toString(36).substr(2, 9);

			if (currFiles.length == 1) {
				let data = new FormData();
				data.append('file', currFiles[0]);
				fetch('/api/file', {
					method: 'POST',
					body: data
				})
				.then(res => {
					return new Promise((resolve)=>{
						res.text().then((text)=> resolve(
						{
							ok : res.ok,
							status : res.status.toString(),
							text
						}))
					})
				})
				.then(({ok, status, text}) => {
					if (ok) {
						setMessage(UPLOADSUCCESS);
						setSubMessage(SUBUPLOADSUCCESS);
						setCode(text);
					}
					else {
						setMessage(UPLOADFAILED);
						setSubMessage(SUBUPLOADFAILED);
						setCode(status);
						console.error(text);
					}
					setCurrentFiles([]);
					window.scrollTo({
						top: 0,
					});
				})
				.catch(err => {
					//error happens
					setMessage(UPLOADFAILED);
					setSubMessage(SUBUPLOADFAILED);
					console.error(err);
					setCode(err);
					setCurrentFiles([]);
					window.scrollTo({
						top: 0,
					});
				});
			}
			else {
				const total = currFiles.length;
				let groupCode = "";
				fetch(`/api/file-group?total=${total}`, {
					method: 'GET',
				})
				.then(res => {
					return new Promise((resolve)=>{
						res.text().then((text)=> resolve(
						{
							ok : res.ok,
							status : res.status.toString(),
							text
						}))
					})
				})
				.then(({ok, status, text}) => {
					if (ok) {
						groupCode = text;
						// send all files, the text is the group-code
						return Promise.all(currFiles.map((currFile, index)=>{
							let data = new FormData();
							data.append('file', currFile);
							data.append('index', index);
							data.append('group', text);
							return fetch(`/api/file`, {
								method : 'POST',
								body : data
							})
							.then(res => {
								return new Promise((resolve)=>{
									res.text().then((text)=> resolve(
									{
										ok : res.ok,
										status : res.status.toString(),
										text
									}))
								})
							})
							.catch(err => {
								return {ok:false, status:err, text:err}
							});
						}));
					} else {
						setMessage(UPLOADFAILED);
						setSubMessage(SUBUPLOADFAILED);
						setCode(status);
						console.error(text);
						throw "Group Upload failed";
					}
				})
				.then(responses => {
					let successCount = 0;
					let errorCode = 0;
					let errorMessage = "";
					responses.map((res, index)=>{
						if (res.ok) {
							successCount += 1;
						} else {
							errorCode = res.status;
							errorMessage = res.text;
						}
					})
					if (successCount == currFiles.length){
						setCode(groupCode)
						setMessage(UPLOADSUCCESS);
						setSubMessage(SUBUPLOADSUCCESS);
					} else if (successCount > 0) {
						setCode(groupCode)
						setMessage(UPLOADPARTSUCCESS);
						setSubMessage(SUBUPLOADFAILED);
						console.error(errorMessage)
					} else {
						setMessage(UPLOADFAILED);
						setSubMessage(SUBUPLOADFAILED);
						setCode(errorCode);
						console.error(errorMessage)
					}
					setCurrentFiles([]);
					window.scrollTo({
						top: 0,
					});
				})
				.catch(err => {
					setMessage(UPLOADFAILED);
					setSubMessage(SUBUPLOADFAILED);
					console.error(err);
					setCode(err);
					setCurrentFiles([]);
					window.scrollTo({
						top: 0,
					});
				});
			}
		} else {
			let data = new FormData()
			data.append('text', currText)
			fetch('/api/text', {
				method: 'POST',
				body: data
			})
			.then(res => {
				return new Promise((resolve)=>{
					res.text().then((text)=> resolve(
					{
						ok : res.ok,
						status : res.status.toString(),
						text
					}))
				})
			})
			.then(({ok, status, text}) => {
				if (ok) {
					setMessage(UPLOADSUCCESS);
					setSubMessage(SUBUPLOADSUCCESS);
					setCode(text);
					setCurrText("");
					document.getElementById('input-text').value="";
				} else {
					setMessage(UPLOADFAILED);
					setSubMessage(SUBUPLOADFAILED);
					setCode(status);
					console.error(text);
				}
				window.scrollTo({
					top: 0,
				});
			}) 
			.catch(err => {
				setMessage(UPLOADFAILED);
				setSubMessage(SUBUPLOADFAILED);
				console.error(err);
				setCode(err);
				setCurrentFiles([]);
				window.scrollTo({
					top: 0,
				});
			});
		}
	}

	const cleanContents = (e) => {
		e.preventDefault();
		if (inputType == FILE){
			cleanFiles();
		} else {
			setCurrText("");
			document.getElementById('input-text').value="";
		}
	}

	const dropHandler = (e) => {
		// Prevent default behavior (Prevent file from being opened)
		e.preventDefault();
		e.stopPropagation();

		if (e.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			let files = [];
			for (var i = 0; i < e.dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (e.dataTransfer.items[i].kind === 'file') {
					var file = e.dataTransfer.items[i].getAsFile();
	        		files = [...files, file]
				}
			}
			addFiles(files)
	  	}
	}

	const dragOverHandler = (e) => {
		// Prevent default behavior (Prevent file from being opened)
		e.preventDefault();
		e.stopPropagation();
	}

	const handleInputTypeChange = (event, newInputType) => {
		if (newInputType != null) {
			setInputType(newInputType);
		}
	};

	const messageShowCurrFile = (currFiles) => {
		if (currFiles.length > 0) { return (
			<Grid container 
				flexDirection="row" 
				alignItems="center"
				justifyContent="center"
			>
				{currFiles.map((currFile, index) =>
					<Grid item xs={2}>
						<FileAvatar filename={currFile.name} key={`upload-file-${index}`}/>
					</Grid>)}
			</Grid>
		)} else { return (
			<Typography
				variant="h2"
				component="div"
				sx={{
					m: {xs: 2},
					fontSize: {xs: "1.8rem", md: "2.5rem"},
				}}
			>
				Drag files here or click to upload. (max size : 100 MB)
			</Typography>
		)}
	} 

	return (
		<Grid container
			flexDirection={{ xs: "column"}}
			alignItems="center"
			justifyContent="center"
			style={{minHeight: '80vh'}}
			spacing={1}
		>
			<Grid item>
				<Typography
			  		component="div"
					sx={{
						fontSize: "3rem",
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
						fontSize: "4rem",
					}}
				>
					{code.toString().toUpperCase()}
				</Typography> 
			</Grid>}
			<Grid item>
				<Typography
					component="div"
					sx={{
						m: 1,
						fontSize: "1.5rem",
					}}
				>
					{subMessage}
				</Typography>
			</Grid>
		{/*The input part*/}
			<Grid item>
				<ToggleButtonGroup
			      color="primary"
			      value={inputType}
			      exclusive
			      onChange={handleInputTypeChange}
			      size="large"
			    >
			    	<ToggleButton value={FILE}>FILE</ToggleButton>
			    	<ToggleButton value={TEXT}>TEXT</ToggleButton>
			    </ToggleButtonGroup>
		    </Grid>	
		{/*file upload field*/}
			<Container 
				maxWidth="false"
				style={{
					width : '80vw', 
					minHeight: '40vh',
				}}>
				{(inputType==FILE) && <Grid item>
					<div onDrop={dropHandler} onDragOver={dragOverHandler}>
						<Button
							component="label" 
							className={classes.uploadButton}
						>
							<input
								id="input-file"
								type="file"
								onChange={inputFile}
								hidden
							/>							
							{messageShowCurrFile(currFiles)}
						
						</Button>
					</div>
				</Grid>}
				{(inputType==TEXT) && <Grid item>
					<TextareaAutosize
						id="input-text"
						style={{
							width : '80vw', 
							height: '40vh',
							fontSize: '1.5rem',
						}}
						onChange={changeText}
					>
					</TextareaAutosize>
				</Grid>}
			</Container>
		{/*upload button*/}
			<Grid item container 
				flexDirection="row"
				alignItems="center"
				justifyContent="center"
			>
				<Grid item xs={1} >
					<Button
						variant="contained"
						onClick={cleanContents}
						style={{height:"100%", width:"100%"}}
					>
						Clean
					</Button>
				</Grid>
				<Grid item xs={0.5}/>
				<Grid item xs={1}>
					<Button
						variant="contained"
						onClick={uploadContents}
						style={{height:"100%", width:"100%"}}
					>
						Upload
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}