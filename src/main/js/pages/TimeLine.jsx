import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Grid, Avatar} from "@mui/material";

import Navbar from "../components/Navbar";
import TimelineBlock from "../components-timeline/TimelineBlock"
import Copyright from "../components/Copyright"

import '../components-timeline/TimelineBlock.css';


export default function Homepage(props) {

	const events = [
		{
			title : "Thanksgiving Dinner",
			time : "Nov 2021",
			img : "/images/thanksgiving.png",
			imgSize : ["200", "200"],
			text : "Enjoy the turkey and the friendship."
		},
		{
			title : "Long Island Trip",
			time : "Dec 2021",
			img : "/images/long_island.png",
			imgSize : ["300", "200"],
			text : "Feel wind from the ocean."
		},
		{
			title : "Merry Christmas",
			time : "Dec 2021",
			img : "/images/christmas_tree.png",
			imgSize : ["300", "200"],
			text : "See big giant christmas tree in the New York downtown. \
					May be the same tree appear in the <em> Hawkeye </em> ?"
		},
		{
			title : "Dog Keeper",
			time : "Jan 2022",
			img : "/images/dog.png",
			imgSize : ["200", "300"],
			text : "Take care of a happy puppy."
		},
		{
			title : "Universal Resort",
			time : "Mar 2022",
			img : "/images/universal.png",
			imgSize : ["200", "300"],
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
		}
	]

	return (
		<Container disableGutters maxWidth="false" sx={{bgcolor:"#FAFEFF"}}> 
			<Navbar />
			<header>
				<Typography
					component="h1"
					color="primary"
					sx={{
						fontSize: { xs: "2rem" },
					}}
				>
					Timeline
				</Typography>
			    <Typography
					component="h1"
					sx={{
						mb: { xs: 2, md: 5 },
						fontSize: { xs: "1rem" },
					}}
				>
					Recoding the exciting moment
				</Typography>
			</header>
			<ul class="timeline">
				{events.map((event, index)=> 
					<TimelineBlock left={(index % 2 == 0) ? "true" : "false"} title={event.title} time={event.time}>
						<img src={event.img} width={event.imgSize[0]} height={event.imgSize[1]}/>
						<div>
							{event.text}
						</div>
					</TimelineBlock>
				)}
			</ul>
			<Copyright />
		</Container>
	);
}