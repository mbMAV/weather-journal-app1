/* Global Variables */

// Personal API Key for OpenWeatherMap API
const key = ""; // place API key here
const apiKey = `&appid=${key}&units=imperial`;
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const country_code = ',us';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add event listener at the generate button
document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
    // Get zip code from user input
    const newZip = document.getElementById('zip').value;
    // Get feelings from user input
    const user_input = document.getElementById('feelings').value;
    getWeather(baseURL,newZip,country_code,apiKey)

    .then(function(data){
        const date = {date:newDate};
        const temp = {temp:data.main.temp};
        const user_response = {user_response:user_input};
        // console.log(`in .then`);
        // console.log(data);
        // console.log(temp);
        // console.log(date);
        // console.log(user_response);
        postData('/addEntry',{date:newDate, temp:data.main.temp, user_response:user_input});
    })

    .then(function() {
        getData('/all');
    })
}

// Make async API request at openweathermap.org
const getWeather = async (baseURL, newZip, country_code,apiKey)=>{

    const res = await fetch(baseURL+newZip+country_code+apiKey);

    try {
        const data = await res.json();
        // console.log(data);

    postData('/addEntry', data);
    return data;

}  catch(error) {
    console.log("error", error);
    }
}

// Make async POST request
const postData = async ( url = '', data)=>{
    const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
     // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;

    }catch(error) {
    console.log("error", error);
    }
}

// Make async GET request
const getData = async () => {
    const request = await fetch('/all')
    try{
        const allData = await request.json();
        console.log("allData is:", allData);
//  Update DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
        document.getElementById('content').innerText = allData.user_response;
        document.getElementById('date').innerHTML = allData.date;

    }catch(error) {
    console.log("error", error);
    }
}