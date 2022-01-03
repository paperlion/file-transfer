'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

function App(props) {
	return (
		<div> 
			<p>Hello world!</p>
		</div>
	);
}

ReactDOM.render(
	<App/>,
	document.getElementById('react')
)

