import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, TextField, IconButton} from "@mui/material";

import Fileavatar from "./Fileavatar"

import SearchIcon from '@mui/icons-material/Search';

const FINDFILEFAIL = "Sorry. I can't find a file with that code.";
const FINDFILE = "Awesome! You got the file. Now click and download it:";

export default function Fileachiever(props) {
	const [code, setCode] = useState(null);
	const [fileInfo, setFileInfo] = useState(null);
	const [result, setResult] = useState(null);

	const [codeErrorMessage, setCodeErrorMessage] = useState(null);

	const changeCode = (e) => {
		setCode(e.target.value);
		setCodeErrorMessage(null);
		setResult(null);
	};

	const checkCode = (code) => {
		if (/^[0-9a-zA-Z]{4}$/.test(code)) {
			return true;
		} else {
			return false;
		}

	};

	const searchFile = (e) => {
		e.preventDefault();
		if (!checkCode(code)) {
			setCodeErrorMessage("*code should be of length 4 and includes only digits and albert characters");
			return;
		} else {
			setCodeErrorMessage(null)
		}
		setFileInfo(null);
		fetch(`/api/files/${code.toLowerCase()}`, {
			method: 'GET',
		}).then(res => {
			return res.json().then(json=>{
				if (!json.name) {
					setResult(FINDFILEFAIL);
				} else {
					setResult(FINDFILE);
					setFileInfo(json);
					window.scrollTo({
						top:e.clientY,
					});
				}
			});
		})
	}

	return (
		<Grid container
			spacing={0}
			direction="column"
			alignItems="center"	
			style={{height: '50vh'}}
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
			<Grid item>
			{fileInfo && <Fileavatar filename={fileInfo.name} link={`download/${fileInfo.id}`}/>}
      		</Grid>
		</Grid>
	);
}