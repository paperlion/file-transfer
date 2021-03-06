import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, Card} from "@mui/material";


export default function Copyright(props) {
	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
			justifyContent="flex-end"
			style={{minHeight: '30vh'}}
			spacing={0}
    	>
    		<Grid item>
				<Typography
					sx={{
						mb: 5,
						fontSize: "1rem",
					}}
				>
					©2022 Designed and coded by Haitian Ren. All rights reserved.
				</Typography>
			</Grid>
		</Grid>
	)
}