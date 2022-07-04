import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, Avatar} from "@mui/material";

import Typewriter from "typewriter-effect";

const paragrah = {
	name : "Robin Ren",
	shortIntro : "I am a graduate student. ",
	shortIntro2 : "I create software. ",
	interest1 : "good at programming, but don't like it",
	interest2 : "poor at video games, but do love it",
	age : "A 23 year-old ",
	like : "Programmer, Games Lover, New Tech Seeker and Sometimes Day Dreamer",
	skill : "Java/Python/JS/C++ Programming, Full-stack Development",
	goal : "Looking for a job",
	announce : "this is my first website, please take care with it."
}


export default function PersonInfo (props) {
	return (
		<Grid container 
			spacing={0}
			flexDirection={{ xs: "column", md: "row" }}
			alignItems="center"
			justifyContent="start"
			style={{height: '100vh'}}
			id="home"
		>
				<Grid container item xs={6} 
				    spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
				>
					<Grid item>
						<Avatar
							alt="Robin Ren"
							src="/images/selfie.jpeg"
							sx={{ width: 400, height: 400 }}
						/>
					</Grid>
					<Grid item>
						<Typography
							sx={{
								fontSize: "1.5rem",
							}}
							color="primary"
						>
							{"renht@seas.upenn.edu"}
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							sx={{
								fontSize: "1.5rem",
							}}
							color="primary"
						>
							{"(215)921-0870"}
						</Typography>
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
							mb: 5 ,
							fontSize: { xs: "3rem", md: "2rem" },
						}}
						color="primary"
					>
						Hello, my name is
					</Typography>
					<Typography
						variant="h2"
						component="div"
						sx={{
							mb: 5 ,
							fontSize: { xs: "5rem", md: "4rem" },
						}}
					>
						{paragrah.name}
					</Typography>
					<Typography
						variant="h3"
						component="div"
						sx={{
							mb: 2,
							fontSize: { xs: "3.5rem", md: "3rem" },
							height : {xs : '10vh', md: '5vh'},
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
							mb: 5,
							fontSize: { xs: "3rem", md: "2rem" },
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