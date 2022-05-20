import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid} from "@mui/material";

export default function NotFound(props) {
	return (
		<Grid container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{height: '75vh'}}
		> 
			<Grid item>
				<Typography
					component="div"
					sx={{
						mb: {xs: 2},
						fontSize: {xs: "2rem", md: "3rem"},
					}}
				>
					404 Not Found
				</Typography>
			</Grid>
			<Grid item>
				<Typography
					component="div"
					sx={{
						mb: {xs: 2},
						fontSize: {xs: "1rem", md: "1.5rem"},
					}}
				>
					Sorry there is nothing here. Please check your url and try again.
				</Typography>
			</Grid>
		</Grid>
	);
}