import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Input, Grid, 
	TextField, ToggleButton, ToggleButtonGroup, TextareaAutosize, IconButton, InputAdornment} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {makeStyles} from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery';

const math = require('mathjs')

const startPersons = [{name:"Robin", total:50}, {name:"Jack", total:50}, {name:"", total:0}, {name:"", total:0}]
const startItems = [{name:"Apples", price:"10", notPay:[]}, {name:"", price: "", notPay:[]}, {name:"", price:"", notPay:[]},
					{name:"", price: "", notPay:[]}, {name:"", price: "", notPay:[]}]
const startValues = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

const NAME_LENGTH = 1.26
const ITEM_LENGTH = 1.2
const HEAD_LENGTH = NAME_LENGTH + ITEM_LENGTH

const useStyles = makeStyles(theme => ({
	tableHead : {
		position: 'relative',
		width: 0,
		height: 0,
		borderLeft: '10vw solid',
		borderTop: '3vh solid',
		borderBottom: '3vh solid',
		borderRight: '10vw solid',
		borderLeftColor: theme.palette.primary.main,
		borderTopColor: theme.palette.primary.light,
		borderBottomColor: theme.palette.primary.main,
		borderRightColor: theme.palette.primary.light,
	},
	textLeft : {
		position : "absolute",
		right : '3.5vw',
		top: '-1vh',
		fontSize : '1.2rem',
		color : 'white',
	},
	textRight : {
		position : "absolute",
		left : '4vw',
		bottom : '-1vh',
		fontSize : '1.2rem',
		color : 'white',
	},
	personGrid : {
		display : 'flex',
		flexDirection : 'column',
		alignItems : 'center',
		justifyContent : 'center',
	}
}));

export default function CalculationTable(props) {

	const [persons, setPersons] = useState(startPersons);
	const [items, setItems] = useState(startItems);
	const [tax, setTax] = useState(0);
	const [values, setValues] = useState(startValues);

	const smallScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

	const classes = useStyles();

	useEffect(() => {
    	calculateValue(persons, items, tax);
  	}, []);

	const calculateValue = (persons, items, tax) => {
		let newValues = [];
		persons.forEach((person) => {
			person.total = 0;
		})
		items.forEach((item) => {
			let row = [];
			let numbersPay = persons.length - item.notPay.length;
			persons.forEach((person, index) => {
				if (item.notPay.includes(index)){
					row.push(0);
				} else {
					let priceToPay = parseFloat(item.price ? item.price : 0)/numbersPay;
					row.push(priceToPay);
					person.total += priceToPay;
				}
			})
			newValues.push(row);
		})
		persons.forEach((person) => {
			person.total = (1 + tax/100) * person.total;
		})
		setPersons(persons);
		setItems(items);
		setTax(tax);
		setValues(newValues);
	}
	const addPerson = () => {
		let newPersons = [...persons]
		newPersons.push({name:"", total:0})
		calculateValue(newPersons, items, tax);
	}
	const editPerson = (index, name) => {
		let newPersons = [...persons];
		newPersons[index].name = name;
		setPersons(newPersons);
	}
	const removePerson = (index) => {
		if (persons.length == 1) {
			alert("Cannot remove the last person");
			return;
		}
		let newPersons = [...persons];
		newPersons.splice(index, 1);
		// remove that person in the notpay item
		let newItems = [...items];
		newItems.forEach((item) => {
			item.notPay = item.notPay.filter((i) => i != index).map((i)=> i>index ? i-1 : i);
		})
		calculateValue(newPersons, newItems, tax);
	}
	const addItem = () => {
		let newItems = [...items];
		newItems.push({name:"", price: "", notPay:[]});
		calculateValue(persons, newItems, tax);
	}
	const editItem = (index, name, price) => {
		let newItems = [...items];
		if (name != null) {
			newItems[index].name = name;
			setItems(newItems);
		}
		if (price != null) {
			newItems[index].price = price;
			calculateValue(persons, newItems, tax);
		}
	}
	const removeItem = (index) => {
		let newItems = [...items];
		newItems.splice(index, 1);
		calculateValue(persons, newItems, tax);
	}
	const cancelItemForPerson = (pindex, index) => {
		let newItems = [...items];
		let included = newItems[index].notPay.includes(pindex);
		if (included) {
			newItems[index].notPay = newItems[index].notPay.filter(i => i != pindex)
		} else {
			newItems[index].notPay.push(pindex)
		}
		calculateValue(persons, newItems, tax);
	}

	// tax handler
	const editTax = (tax) => {
		if (tax == "") {
			tax = 0;
		}
		calculateValue(persons, items, tax);
	}

	// button click
	const clickAddPerson = () => {
		return () => addPerson();
	}
	const clickRemovePerson = (index) => {
		return () => removePerson(index);
	}
	const modifyPersonName = (index) => {
		return (e => editPerson(index, e.target.value));
	}
	const clickAddItem = () => {
		return () => addItem();
	}
	const clickRemoveItem = (index) => {
		return () => removeItem(index);
	}
	const modifyItemName = (index) => {
		return (e => editItem(index, e.target.value));
	}
	const modifyItemPrice = (index) => {
		return (e => editItem(index, null, e.target.value));
	}
	const clickPrice = (pindex, index) => {
		return () => cancelItemForPerson(pindex, index);
	}
	const modifyTax = () => {
		return (e => editTax(e.target.value));
	}

	return (
		<Grid container
			direction="column"
			justifyContent="flex-start"
			style={{minHeight: '80vh'}}
			spacing={1}
		>
			{/*first line*/}
			<Grid container item justifyContent="center" spacing={1}>
				{/*tab*/}
				<Grid item key="head" xs={HEAD_LENGTH}>
					<div className={classes.tableHead}>
						<Typography className={classes.textLeft}> Items </Typography>
						<Typography className={classes.textRight}> Users </Typography>
					</div>
				</Grid>
				{persons.map((person, index) => <Grid item key={`person-${index}`} xs={ITEM_LENGTH} className={classes.personGrid}>
					{smallScreen && <AccountCircleOutlinedIcon color="primary" sx={{fontSize :'3rem'}} />}
					<TextField placeholder={`User ${index}`} value={person.name} onChange={modifyPersonName(index)}
						InputProps={{startAdornment: smallScreen ? null : <AccountCircleOutlinedIcon/>, 
							endAdornment: <IconButton onClick={clickRemovePerson(index)}><ClearIcon/></IconButton>}}>
					</TextField>
				</Grid>
				)}
				<Grid item key="button-add-person" xs={ITEM_LENGTH}>
					<Button variant="outlined" onClick={clickAddPerson()}>
						<AddIcon/>
					</Button>
				</Grid>
			</Grid>
			{/*rows*/}
			{items.map((item, index)=> <Grid container item key={`item-${index}`} justifyContent="center" spacing={1}>
				{/*item self*/}
				<Grid item xs={NAME_LENGTH}>
					<TextField placeholder={`Item ${index}`} value={item.name} onChange={modifyItemName(index)}
						InputProps={{endAdornment: <IconButton onClick={clickRemoveItem(index)}><ClearIcon/></IconButton>}}>
					</TextField>
				</Grid>
				<Grid item xs={ITEM_LENGTH}>
					<TextField label="price" placeholder={"0"} type="number" value={item.price} onChange={modifyItemPrice(index)}
						InputProps={{startAdornment:<AttachMoneyIcon/>}}>
					</TextField>
				</Grid>
				{persons.map((p, pindex) => <Grid item key={`value-${index}-${pindex}`} xs={ITEM_LENGTH}>
					<Button variant={item.notPay.includes(pindex) ? "outlined" : "contained"} color='info'
						onClick={clickPrice(pindex, index)} sx={{width:"100%", height:"100%"}}>
						{math.round(values[index][pindex], 2).toString()}
					</Button>
				</Grid>
				)}
				<Grid key="tail" item xs={ITEM_LENGTH}>
				</Grid>
			</Grid>)}
			{/*result*/}
			<Grid container item key="total-money" justifyContent="center" spacing={1}>
				{/*tab*/}
				<Grid item key="head-add-items" xs={NAME_LENGTH}>
					<Button variant={"outlined"} onClick={clickAddItem()}>
						<AddIcon/>
					</Button>
				</Grid>
				<Grid item xs={ITEM_LENGTH}>
					<Typography
						align="center"
				  		sx={{fontSize: "2rem",}}
				  		color="primary"
					>
				  		Total:
					</Typography>
				</Grid>
				{persons.map((person, index) => <Grid item key={`person-${index}`} xs={ITEM_LENGTH}>
					<TextField value={math.round(person.total, 2).toString()}
						InputProps={{startAdornment:<AttachMoneyIcon/>}}>
					</TextField>
				</Grid>
				)}
				<Grid key="tax" item xs={ITEM_LENGTH}>
					<TextField label="tax" placeholder={"0"} type="number" value={tax ? tax.toString() : ""} onChange={modifyTax()}
						InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}>
					</TextField>
				</Grid>
			</Grid>
		</Grid>
	)
}