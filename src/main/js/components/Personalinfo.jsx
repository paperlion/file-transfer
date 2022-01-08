import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, Avatar} from "@mui/material";

import Typewriter from "typewriter-effect";

const paragrah = {
	name : "Robin Ren",
	shortIntro : "I am a graduate student. ",
	shortIntro2 : "I create software. ",
	interest1 : "good at programming, but don't like it",
	interest2 : "poor at video games, but do love it",
	age : "23 year-old ",
	like : "Programmer, Games Lover, New Tech Seeker and Sometimes Day Dreamer",
	skill : "Java/Python/JS/C++ Programming, Full-stack Development",
	goal : "Looking for a job",
	announce : "this is my first website, please take care with it."
}


export default function Personalinfo (props) {
	return (
		<Grid container 
			spacing={0}
			flexDirection={{ xs: "column-reverse", md: "row" }}
			alignItems="center"
			justifyContent="space-around"
			style={{height: '100vh'}}
			id="home"
		>
			<Grid item xs={6} >
				<Grid container
				    spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					spacing={5}
				>
					<Grid item>
						<Avatar
							alt="Robin Ren"
							src="/images/selfie.png"
							sx={{ width: {xs :300, md :400}, height: {xs :300, md :400} }}
						/>
					</Grid>
					<Grid item>
						<Typography
							sx={{
								mb: { xs: 2, md: 5 },
								fontSize: {xs: "1rem", md: "1.5rem"},
							}}
							color="primary"
						>
							{"renht@seas.upenn.edu"}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6}>
				<Grid 
					container
					spacing={0}
					direction="column"
					
					justifyContent="center"
				>
					<Typography
						component="div"
						sx={{
							mb: { xs: 2, md: 5 },
							fontSize: { xs: "1.5rem", md: "2rem" },
						}}
						color="primary"
					>
						Hello, my name is
					</Typography>
					<Typography
						variant="h2"
						component="div"
						sx={{
							mb: { xs: 2, md: 5 },
							fontSize: { xs: "3rem", md: "4rem" },
						}}
					>
						{paragrah.name}
					</Typography>
					<Typography
						variant="h3"
						component="div"
						sx={{
							mb: { xs: 2, md: 5 },
							fontSize: { xs: "2rem", md: "3rem" },
						}}
						color="primary"
					>
						<Typewriter
							options={{
								strings: [paragrah.shortIntro, paragrah.shortIntro2],
								autoStart: true,
								loop: true,
								delay: 30,
							}}
						/>
					</Typography>
					<Typography
						variant="h4"
						component="div"
						sx={{
							mb: { xs: 2, md: 5 },
							fontSize: { xs: "1.5rem", md: "2rem" },
							fontFamily: "Monospace",
						}}
					>
						{paragrah.age} 
						{paragrah.like}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	)
}