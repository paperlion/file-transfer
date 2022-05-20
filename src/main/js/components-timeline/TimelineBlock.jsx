import React, { useEffect, useState } from "react";

import "./TimelineBlock.css";

export default function TimelineBlock(props) {

	const direction = (props.left == "true") ? "direction-l" : "direction-r";
	const title = props.title ? props.title : "(No Title)";
	const time = props.time ? props.time : "(No Time)";

	return (
		<li>
			<div class={direction}>
		    	<div class="flag-wrapper">
		        	<span class="hexa"> </span>
		        	<span class="flag"> {title} </span>
		        	<span class="time-wrapper">
		        		<span class="time"> {time} </span>
		        	</span>
		       	</div>
		       	<div class="desc">
		       		{props.children}
		       	</div>
		    </div>
		</li>
	)
}

