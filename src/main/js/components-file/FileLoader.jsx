import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Input, Grid, 
	TextField, ToggleButton, ToggleButtonGroup, TextareaAutosize} from "@mui/material";

const WELCOME = "Welcome to Robin's Fast File Transfer!"
const SUBTITLE = "upload and achieve files/text everywhere with 4-character code."

const UPLOADSUCCESS = "Upload Sucess. Your Code Is:";
const SUBUPLOADSUCCESS = "(files/text will be kept for 60 minutes)";

const FILE = 0;
const TEXT = 1;

export default function FileLoader(props) {
	const [message, setMessage] = useState(WELCOME);
	const [subMessage, setSubMessage] = useState(SUBTITLE);
	const [currFiles, setCurrentFiles] = useState([]);
	const [code, setCode] = useState(null);

	const [inputType, setInputType] = useState(FILE);

	const [currText, setCurrText] = useState(null);

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

			let groupId = Math.random().toString(36).substr(2, 9);
			let resultRecord = new Array(currFiles.length);

			currFiles.map((currFile, index)=>{
				let data = new FormData();
				data.append('file', currFile)
				data.append('group', groupId)
				data.append('index', index)
				data.append('total', currFiles.length)
				fetch('/api/file', {
					method: 'POST',
					body: data
				}).then(res => {
					return res.text().then(text=>{
						if (res.ok) {
							if (text == "Error") {
								resultRecord[index] = "Unknown Error"
								console.log("fail " + index)
							}
							else {
								setMessage(UPLOADSUCCESS);
								setSubMessage(SUBUPLOADSUCCESS);
								setCode(text);
								setCurrentFiles([]);
								window.scrollTo({
									top: 0,
								});
							}
						} else {
							//error happens
							console.error(text);
							resultRecord[index] = text
						}
					});
				})
			})
		} else {
			let data = new FormData()
			data.append('text', currText)
			fetch('/api/text', {
				method: 'POST',
				body: data
			}).then(res => {
				return res.text().then(text=>{
					if (res.ok) {
						setMessage(UPLOADSUCCESS);
						setSubMessage(SUBUPLOADSUCCESS);
						setCode(text);
						setCurrText("");
						document.getElementById('input-text').value="";
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
	        		console.log('... file[' + i + '].name = ' + file.name);
	        		files = [...files, file]
				}
			}
			addFiles(files)
	  	} else {
	    	// Use DataTransfer interface to access the file(s)
	    	for (var i = 0; i < e.dataTransfer.files.length; i++) {
	      		console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
	    	}
	  	}
	}

	const dragOverHandler = (e) => {
		console.log("drag over")
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
			<Typography
				variant="h2"
				component="div"
				sx={{
					m: {xs: 2},
					fontSize: {xs: "1rem", md: "1.5rem"},
				}}
			>
				{currFiles.length}
			</Typography>
		)} else { return (
			<Typography
				variant="h2"
				component="div"
				sx={{
					m: {xs: 2},
					fontSize: {xs: "1rem", md: "1.5rem"},
				}}
			>
				Drag files here or click to upload. (max size : 10 MB)
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
						m: {xs: 1},
						fontSize: {xs: "1rem", md: "1.5rem"},
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
					height: '40vh',
				}}>
				{(inputType==FILE) && <Grid item>
					<div onDrop={dropHandler} onDragOver={dragOverHandler}>
						<Button
							component="label"
							style={{
								width : '80vw', 
								height: '40vh', 
								borderRadius: 50, 
								border: "1px dashed grey",
								textTransform:'none',
								}}
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