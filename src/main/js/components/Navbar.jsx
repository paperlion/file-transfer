import React, { useEffect, useState } from "react";
import {AppBar, Box, Toolbar, Container, Button, Link} from "@mui/material";

export default function Navbar(props) {
	return (
		<AppBar 
			position="static" 
			sx={{ position: "sticky", top: "0", zIndex: "60", maxWidth: "none" }}
		>
			<Container maxWidth="false">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow : 1, display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							sx={{ color: "white"}}
							size="large"
							href="/#home"
						>
							home
						</Button>
						<Button
							sx={{ color: "white"}}
							size="large"
							href="/#about"
						>
							about
						</Button>
						<Button
							sx={{ color: "white"}}
							size="large"
							href="/timeline"
						>
							timeline
						</Button>
						<Button
							sx={{ color: "white"}}
							size="large"
							href="/file"
						>
							file
						</Button>
						<Button
							sx={{ color: "white"}}
							size="large"
							href="/bill"
						>
							bill
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};