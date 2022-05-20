import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, TextField, IconButton, Avatar} from "@mui/material";

export default function FileAvatar(props) {
	const filename = props.filename;
	const link = props.link;
	const style = props.style ? props.style : {width:"50px", height:"50px"};

	const getIconPath = (name) => {
		if (/.pdf$/.test(name)) {
			return '/images/pdf.png';
		} else {
			return '/images/file.png';
		}
	}

	return (
		<Grid container
			spacing={0}
			direction="column"
			alignItems="center"	
		>
			<Grid item>
				<Button href={link}>
					<img src={getIconPath(filename)} style={style}/>
				</Button>
			</Grid>
			<Grid item>
				<Typography
					sx={{
						mb: {xs: 2},
						fontSize: {xs: "1rem", md: "1.5rem"}
					}}
				>
					<a href={link}>
						{filename}
					</a>
				</Typography>
			</Grid>
		</Grid>
	)
}