import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	background : {
		position: 'fixed',
		width: '100vw',
		height: '100vh',
		top: '0px',
		left: '0px',   
		zIndex: -1,
		opacity: 0.5
	},
})


export default function BackgroundImage (props) {

	const {src} = props;
	const defaultSrc = '/bg/bg7.jpeg'
	const classes = useStyles();

	return (
		<img className={classes.background} src={src ?? defaultSrc} />
	);
}