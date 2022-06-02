import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, TextField, IconButton} from "@mui/material";

import FileAvatar from "./FileAvatar"

import SearchIcon from '@mui/icons-material/Search';

const FINDFILEFAIL = "Sorry. I can't find a file with that code.";
const FINDFILE = "Awesome! You got the file. Now click and download it:";
const FINDFILES = "Awesome! You got some files. Now click and download them:";
const FINDTEXT = "The text you request is:";

export default function FileAchiever(props) {
	const [code, setCode] = useState(null);
	const [filesInfo, setFilesInfo] = useState(null);
	const [result, setResult] = useState(null);
	const [textFound, setText] = useState(null);

	const [codeErrorMessage, setCodeErrorMessage] = useState(null);

	const changeCode = (e) => {
		setCode(e.target.value);
		setCodeErrorMessage(null);
		setResult(null);
	};

	const checkCode = (code) => {
		if (code == null) 
			return false;
		if (/^[0-9a-zA-Z]{4}$/.test(code)) {
			return true;
		} else {
			return false;
		}

	};

	const cleanInfo = () => {
		setFilesInfo(null);
		setText(null);
	}	
	const searchFile = (e) => {
		e.preventDefault();
		if (!checkCode(code)) {
			setCodeErrorMessage("*code should be of length 4 and includes only digits and albert characters");
			return;
		} else {
			setCodeErrorMessage(null)
		}
		setFilesInfo(null);
		fetch(`/api/files/${code.toLowerCase()}`, {
			method: 'GET',
		}).then(res => {
			cleanInfo();
			return new Promise((resolve)=>{
				res.json().then((json)=> resolve(
				{
					ok : res.ok,
					status : res.status.toString(),
					files : json
				}))
			})
		})
		.then(({ok, status, files})=>{
			if (!ok || files.length == 0) {
				setResult(FINDFILEFAIL);
			} else if (files.length == 1 && files[0].type == "TYPE_TEXT") {
				setResult(FINDTEXT);
				fetch(`/api/download/${code.toLowerCase()}`, {
					method: 'GET',
				})
				.then(res => res.text())
				.then(text=>{
					setText(text);
				})
			} else {
				console.log(files)
				setResult(FINDFILE);
				setFilesInfo(files);
			}
			window.scrollTo({
				top:e.pageY,
			});
		});
	}

	return (
		<Grid container
			spacing={0}
			direction="column"
			alignItems="center"	
			style={{minHeight: '50vh'}}
		>
			<Grid item>
				<Typography
			  		component="div"
					sx={{
						mb: {xs: 1},
						fontSize: {xs: "1.5rem", md: "3rem"},
					}}
			  		color="primary"
				>
			  		Acheive Files
				</Typography>
			</Grid>
			<Grid item>
				<Box 
					sx={{ 
						flexGrow : 1, 
						display: 'flex', 
						justifyContent: 'center', 
						mb: {xs: 1}, 
					}}
				>
					<TextField 
						id="code" 
						variant="outlined" 
						onChange={changeCode}
						placeholder="Please enter code"
					/>
					<IconButton variant="contained"
						onClick={searchFile}
						color="primary"
						component="span"
					>
						<SearchIcon/>
					</IconButton>
				</Box>
			</Grid>
			{codeErrorMessage && <Grid item>
				<Typography
					component="div"
					sx={{
						mb: {xs: 1},
						fontSize: {xs: "0.5rem", md: "1rem"},
						color: "Red",
					}}
				>
					{codeErrorMessage}
				</Typography>
			</Grid>}
			<Grid item>
				<Typography
					component="div"
					sx={{
						mb: {xs: 2},
						fontSize: {xs: "1rem", md: "1.5rem"}
					}}
				>
					{result}
				</Typography>
			</Grid>
			<Grid item container alignItems="center" justifyContent="center">
				{filesInfo && filesInfo.map((fileInfo, index) =>
					<Grid item xs={2}>
						<FileAvatar filename={fileInfo.name} link={`api/download/${fileInfo.id}`} key={`file-${index}`}/>
					</Grid>)
				}
				{textFound && <Typography
					component="div"
					sx={{
						m: {xs: 1},
						fontSize: {xs: "1rem", md: "1.5rem"},
					}}
				>
					{textFound}
				</Typography>}
      		</Grid>
		</Grid>
	);
}