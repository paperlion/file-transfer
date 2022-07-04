import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, TextField, IconButton} from "@mui/material";
import { makeStyles } from "@mui/styles";

import FileAvatar from "./FileAvatar"

import SearchIcon from '@mui/icons-material/Search';

const FINDFILEFAIL = "Sorry. I can't find a file with that code.";
const FINDFILE = "Awesome! You got the file. Now click and download it:";
const FINDFILES = "Awesome! You got some files. Now click and download them:";
const FINDTEXT = "The text you request is:";


const useStyles = makeStyles(theme=> ({
	square: {
		width: '120px',
		height: '50px',
		background: theme.palette.primary.main,
	},
	triangleRight: {
		borderTop: '50px solid transparent',
		borderLeft: '100px solid',
		borderBottom: '50px solid transparent',
		borderLeftColor: theme.palette.primary.main,
	},
	mergeSquareAndTri: {
		display: 'flex',
		direction: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position : 'absolute',
		right : '320px',
		bottom : '-15px'
	},
	searchBox : { 
		position: 'relative',
		flexGrow : 1, 
		display: 'flex', 
		justifyContent: 'center', 
		mb: 1, 
	},
	textInArrow : {
		fontSize: '1rem',
		position: 'absolute',
		left : '15px',
		bottom : '37px',
		color : 'white'
	}
}));

export default function FileAchiever(props) {
	const [code, setCode] = useState(null);
	const [filesInfo, setFilesInfo] = useState(null);
	const [result, setResult] = useState(null);
	const [textFound, setText] = useState(null);
	const [showHelpMessage, setShowHelpMessage] = useState(true)

	const [codeErrorMessage, setCodeErrorMessage] = useState(null);

	const classes = useStyles();

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
		setShowHelpMessage(false);
		cleanInfo();
		if (!checkCode(code)) {
			setCodeErrorMessage("*code should be of length 4 and includes only digits and albert characters");
			return;
		} else {
			setCodeErrorMessage(null)
		}
		fetch(`/api/files/${code.toLowerCase()}`, {
			method: 'GET',
		}).then(res => {
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
						mb: 1,
						fontSize: "3rem",
					}}
			  		color="primary"
				>
			  		Acheive Files
				</Typography>
			</Grid>
			<Grid item>
				<Box className={classes.searchBox}>
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

					{showHelpMessage && <div className={classes.mergeSquareAndTri}>
			          	<div className={classes.square}> </div>
			          	<div className={classes.triangleRight}> </div>
			          	<Typography className={classes.textInArrow}>
							Achieve files here!
						</Typography>
			        </div>}
				</Box>
			</Grid>
			{codeErrorMessage && <Grid item>
				<Typography
					component="div"
					sx={{
						mb: 1,
						fontSize: "1rem",
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
						mb: 2,
						fontSize:"1.5rem"
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
						m: 1,
						fontSize: "1.5rem",
					}}
				>
					{textFound}
				</Typography>}
      		</Grid>
		</Grid>
	);
}