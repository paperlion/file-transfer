import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Input, Grid, 
	TextField, ToggleButton, ToggleButtonGroup, TextareaAutosize} from "@mui/material";

const WELCOME_MESSAGE = "Welcome to use the Bill Spliter!"

export default function TableHeader(props) {
	return (
		<Grid container
			flexDirection={{ xs: "column"}}
			alignItems="center"
			justifyContent="center"
			style={{minHeight: '20vh'}}
			spacing={1}
		>
			<Grid item>
				<Typography
					sx={{
						fontSize: {xs: "1.5rem", md: "3rem"},
					}}
			  		color="primary"
			  		align="center"
				>
			  		{WELCOME_MESSAGE}
				</Typography>
			</Grid>
		</Grid>
	);
}