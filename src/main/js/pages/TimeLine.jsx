import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, Avatar} from "@mui/material";
import { makeStyles } from "@mui/styles"

import Navbar from "../components/Navbar";
import TimelineBlock from "../components-timeline/TimelineBlock"
import LargeImage from "../components-timeline/LargeImage"
import Copyright from "../components/Copyright"
import BackgroundImage from "../components/BackgroundImage"

const useStyles = makeStyles(theme=>({
	headLine : {
		textAlign: 'center',
  		marginTop: '50px',
  		marginBottom: '10px',
	}
}));

export default function Homepage(props) {

	const classes = useStyles();

	const events = [
		{
			title : "Arrive",
			time : "Aug 2021",
			img : "/images/arrive.png",
			imgSize : ["280", "210"],
			text : "Arrive in Philadelphia. Safe and sound."
		},
		{
			title : "Thanksgiving Dinner",
			time : "Nov 2021",
			img : "/images/thanksgiving.png",
			imgSize : ["280", "210"],
			text : "Enjoy the turkey and friendship."
		},
		{
			title : "Long Island Trip",
			time : "Dec 2021",
			img : "/images/long_island.png",
			imgSize : ["280", "210"],
			text : "Feel wind from the ocean."
		},
		{
			title : "Merry Christmas",
			time : "Dec 2021",
			img : "/images/christmas_tree.png",
			imgSize : ["210", "280"],
			text : <> A big giant christmas tree stands in the New York downtown. 
					Maybe it's the same tree appear in <em> Hawkeye </em> ? </>
				
		},
		{
			title : "Dog Keeper",
			time : "Jan 2022",
			img : "/images/dog.png",
			imgSize : ["210", "280"],
			text : "Take care of a happy puppy."
		},
		{
			title : "Universal Resort",
			time : "Mar 2022",
			img : "/images/universal.png",
			imgSize : ["210", "280"],
			text : "Visit the amazing Universal in Orlando. \
						The Harry Potter's magic castle is my favourite."
		},
		{
			title : "Graduation Ceremony",
			time : "May 2022",
			img : "/images/penn_graduate.png",
			imgSize : ["200", "300"],
			text : "Attend the graduate ceremoney. \
						So glad to take a photo with our beloved dean Vijay Kumar."
		},
		{
			title : "Coldplay Show",
			time : "May 2022",
			img : "/images/coldplay.png",
			imgSize : ["280", "210"],
			text : "If you miss this show, you got a huge loss."
		},
		{
			title : "SIGMOD Conference",
			time : "Jun 2022",
			img : "/images/sigmod.png",
			imgSize : ["210", "280"],
			text : "The photo was taken on the reception of the SIGMOD 2022 conference. \
						Can see I feel a bit stressed dinnering with so many academic elites."
		},
	]

	const [expaneded, setExpanded] = useState(false);
	const [expandedSrc, setExpandedSrc] = useState('');

	const expandImage = (src) => (e) => {
		setExpanded(true);
		setExpandedSrc(src);
	}

	return (
		<Container disableGutters maxWidth="false"> 
			<BackgroundImage />
			<Navbar />
			<header className={classes.headLine}>
				<Typography
					component="h1"
					color="primary"
					sx={{fontSize:'2rem'}}
				>
					Timeline ：Recoding exciting moments
				</Typography>
			</header>
			<ul class="timeline">
				{events.map((event, index)=> 
					<TimelineBlock key={`block-${index}`} left={(index % 2 == 0) ? "true" : "false"} title={event.title} time={event.time}>
						<img src={event.img} width={event.imgSize[0]} height={event.imgSize[1]} onClick={expandImage(event.img)}/>
						<div>
							{event.text}
						</div>
					</TimelineBlock>
				)}
			</ul>
			{ expaneded && <LargeImage src={expandedSrc} setExpanded={setExpanded}/>}
			<Copyright />
		</Container>
	);
}