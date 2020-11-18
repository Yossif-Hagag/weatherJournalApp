/* Global Variables */
const btn = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth())+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//Functions
const postData = async (url="", data= {}) => {
	const response = await fetch(url, {
		method: 'POST', 
		credentials: 'same-origin',
		headers: {
		  'Content-Type': 'application/json',
		},    
		body: JSON.stringify(data), 
	});
	try {
		return await response.json();
	}catch(err) {
		console.log("error", err);
	}
}

const getData = async ()=>{
	if (!zip.value) return alert('Enter zip Code !');
	if (!feelings.value) return alert('Enter your feelings !');
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${zip.value}&units=metric&appid=1ac26d8ad853123d18d8b4bdf18abb01`;
	const res = await fetch(url)
	try {
		const data = await res.json();
		postData('/data', {date:newDate, temp: data.main.temp, content:feelings.value});
		updateUI();
		return data;
	}catch(error) {
		console.log("error", error);
	}
}

const updateUI = async () => {
	const request = await fetch('/all');
	try{
		const allData = await request.json();
		document.getElementById('date').innerHTML = allData[allData.length-1].date;
		document.getElementById('temp').innerHTML = allData[allData.length-1].temp;
		document.getElementById('content').innerHTML = allData[allData.length-1].content;	
	}catch(err) {
		console.log("error", err);
	}
}
//Events
btn.addEventListener('click', getData); 