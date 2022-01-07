import React, { useEffect, useState } from "react";
import {AppBar, Box, Toolbar, Container, Button, Link} from "@mui/material";

const pages = ["home", "about"]

export default function Navbar(props) {
	return (
		<AppBar 
			position="static" 
			sx={{ position: "sticky", top: "0", zIndex: "60", maxWidth: "none" }}
		>
			<Container maxWidth="false">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow : 1, display: 'flex', justifyContent: 'flex-end' }}>
						{pages.map((page) => (
							<Button
								key={page}
								sx={{ color: "white"}}
								size="large"
							>
								<Link href={`#${page}`} underline="none" color="inherit">
									{page}
								</Link>
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};