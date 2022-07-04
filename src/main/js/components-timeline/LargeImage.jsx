import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material"

const useStyles = makeStyles({
	overlay : {
		position: 'fixed',
		width: '100%',
		height: '100%',
		backgroundColor: 'black',
		top: '0px',
		left: '0px',   
		zIndex: 100,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default function LargeImage(props) {
	const {src, setExpanded} = props;
	const classes = useStyles();

	const foldImage = (e) => {
		e.preventDefault()
		setExpanded(false)
	}

	return (
		<div className={classes.overlay} onClick={foldImage}>
			<img src={src} />	
		</div>
	)
}