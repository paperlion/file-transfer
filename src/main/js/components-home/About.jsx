import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, Card} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	cards : {
        padding: "2rem",
        width: "80vw",
        opacity: 0.8,
      }
})

export default function About(props){

	const classes = useStyles();

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
			marginBottom="200px"
			spacing={5}
			id="about"
    	>
    		<Grid item>
    			<Typography
					variant="h2"
					sx={{
						mb: { xs: 2, md: 5 },
						fontSize: { xs: "2rem", md: "3rem" },
					}}
					color = "primary"
				>
					About Me
				</Typography>
				<Card className={classes.cards}>
					<Typography
						sx={{
							fontSize: { xs: "1.5rem"},
							fontFamily: "Monospace",
						}}
					>
						I'm a master's student majoring computer and information science (CIS) in University of Pennsylvania. 
						I like programming, and good at it, especially with Java, Python and Javascript. 
						Beyond that, I love video games more. I got 100+ games in my stream library and spend hundreds of hours on them.
						In the leisure time, I will go to the gym, or doing some cooking (I really cook well).
					</Typography>
				</Card>
			</Grid>
    		<Grid item>
    			<Typography
					variant="h2"
					sx={{
						mb: { xs: 2, md: 5 },
						fontSize: { xs: "2rem", md: "3rem" },
					}}
					color = "primary"
				>
					About This Website
				</Typography>
				<Card className={classes.cards}>
					<Typography
						sx={{
							fontSize: { xs: "1.5rem"},
							fontFamily: "Monospace",
						}}
					>
						This is my first website, created by {}
						<Link href="https://spring.io/" underline = "none"> 
							Spring
						</Link> {} and {}
						<Link href="https://github.com/facebook/react" underline = "none"> 
							React.js 
						</Link> {} from scratch. 
						As my practicing project, this website doesn't have much function, but as time goes it will be added
						more and moreinteresting functions. The first function is a useful tool 
						that allows you to transfer files any time and anywhere. It is times-unlimited and totally free.
						Be sure to click {}
						<Link href="/file" underline = "none"> 
							file
						</Link>
						{} and try it.
						<br />
						I also created a convenient bill spiliter system. Through {}
						<Link href="/bill" underline = "none"> 
							bill
						</Link>
						{} you can quick split a bill between several individuals. It would be helpful if you live together 
						and spend a lot of time on figuring out how much one should pay.
						<br/>
						In the end, thanks to Spring's tutorial and {} 
						<Link href="https://chris-z.netlify.app/" underline = "none">
							Chris Z.'s
						</Link>
						, whose website inspires me a lot.
					</Typography>
				</Card>
    		</Grid>
    	</Grid>
    )
}