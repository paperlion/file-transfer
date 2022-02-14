import React, { useEffect, useState } from "react";
import {Box, Container, Button, Link, Typography, Input, Grid, 
	TextField, ToggleButton, ToggleButtonGroup, TextareaAutosize, IconButton} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const math = require('mathjs')

const startPersons = [{name:"Robin", total:50}, {name:"Jack", total:50}, {name:"", total:0}, {name:"", total:0}]
const startItems = [{name:"Costoco", price:100, notPay:[]}, {name:"", price:0, notPay:[]}, {name:"", price:0, notPay:[]},
					{name:"", price:0, notPay:[]}, {name:"", price:0, notPay:[]}]
const startValues = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

const HEAD_LENGTH = 2
const ITEM_LENGTH = 1

export default function CalculationTable(props) {

	const [persons, setPersons] = useState(startPersons);
	const [items, setItems] = useState(startItems);
	const [values, setValues] = useState(startValues);

	useEffect(() => {
    	calculateValue(persons, items);
  	}, []);

	const calculateValue = (persons, items) => {
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
					let priceToPay = parseFloat(item.price)/numbersPay;
					row.push(priceToPay);
					person.total += priceToPay;
				}
			})
			newValues.push(row);
		})
		setPersons(persons);
		setItems(items);
		setValues(newValues);
	}
	const addPerson = () => {
		let newPersons = [...persons]
		newPersons.push({name:"", total:0})
		calculateValue(newPersons, items);
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
		calculateValue(newPersons, newItems);
	}
	const addItem = () => {
		let newItems = [...items];
		newItems.push({name:"", price:0, notPay:[]});
		calculateValue(persons, newItems);
	}
	const editItem = (index, name, price) => {
		let newItems = [...items];
		if (name != null) {
			newItems[index].name = name;
			setItems(newItems);
		}
		if (price != null) {
			if (price == "") {
				price = 0;
			}
			newItems[index].price = parseFloat(price);
			calculateValue(persons, newItems);
		}
	}
	const removeItem = (index) => {
		let newItems = [...items];
		newItems.splice(index, 1);
		calculateValue(persons, newItems);
	}
	const cancelItemForPerson = (pindex, index) => {
		let newItems = [...items];
		let included = newItems[index].notPay.includes(pindex);
		if (included) {
			newItems[index].notPay = newItems[index].notPay.filter(i => i != pindex)
		} else {
			newItems[index].notPay.push(pindex)
		}
		calculateValue(persons, newItems);
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

	return (
		<Grid container
			direction="column"
			justifyContent="center"
			style={{minHeight: '80vh'}}
			spacing={1}
		>
			{/*first line*/}
			<Grid container item justifyContent="center" spacing={1}>
				{/*tab*/}
				<Grid item key="head" xs={HEAD_LENGTH}>
					<Typography
						align="center"
				  		sx={{fontSize: "2rem",color:"black"}}
					>
				  		Items\Users
					</Typography>
				</Grid>
				{persons.map((person, index) => <Grid item key={`person-${index}`} xs={ITEM_LENGTH}>
					<TextField placeholder={`User ${index}`} value={person.name} onChange={modifyPersonName(index)}
						InputProps={{endAdornment: <IconButton onClick={clickRemovePerson(index)}><ClearIcon/></IconButton>}}>
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
				<Grid item xs={1}>
					<TextField placeholder={`Item ${index}`} value={item.name} onChange={modifyItemName(index)}
						InputProps={{endAdornment: <IconButton onClick={clickRemoveItem(index)}><ClearIcon/></IconButton>}}>
					</TextField>
				</Grid>
				<Grid item xs={1}>
					<TextField placeholder={"0"} type="number" value={item.price.toString()} onChange={modifyItemPrice(index)}
						InputProps={{startAdornment:<AttachMoneyIcon/>}}>
					</TextField>
				</Grid>
				{persons.map((p, pindex) => <Grid item key={`value-${index}-${pindex}`} xs={ITEM_LENGTH}>
					<Button variant={item.notPay.includes(pindex) ? "outlined" : "contained"} onClick={clickPrice(pindex, index)} sx={{width:"100%", height:"100%"}}>
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
				<Grid item key="head-add-items" xs={1}>
					<Button variant={"outlined"} onClick={clickAddItem()}>
						<AddIcon/>
					</Button>
				</Grid>
				<Grid item xs={1}>
					<Typography
						align="center"
				  		sx={{fontSize: "2rem",}}
				  		color="primary"
					>
				  		Total:
					</Typography>
				</Grid>
				{persons.map((person, index) => <Grid item key={`person-${index}`} xs={ITEM_LENGTH}>
					<TextField value={math.round(person.total, 2).toString()}>
					</TextField>
				</Grid>
				)}
				<Grid key="tail" item xs={ITEM_LENGTH}>
				</Grid>
			</Grid>
		</Grid>
	)
}