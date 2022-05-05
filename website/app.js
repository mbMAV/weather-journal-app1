/* Global Variables */

// Personal API Key for OpenWeatherMap API
const key = ""; // place API key here
const apiKey = `&appid=${key}&units=imperial`;
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const country_code = ',de';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add event listener at the generate button
document.getElementById('generate').addEventListener('click', performAction);

// Get zip code from user input
function performAction(e){
    const newZip = document.getElementById('zip').value;
    const user_response = document.getElementById('feelings').value;
    getWeather(baseURL,newZip,country_code,apiKey)

    .then(function(data){
        const date = newDate;
        console.log(`in .then ${data}`)
        postData('/addEntry',{temp: data.main.temp, date ,user_response})
    });
}

// Make async API request at openweathermap.org
const getWeather = async (baseURL, newZip, country_code,apiKey)=>{

    const res = await fetch(baseURL+newZip+country_code+apiKey);

    try {
        const data = await res.json();
    console.log(data)

    // postData('/addEntry', data)
    return data;

}  catch(error) {
    console.log("error", error);
    }
}

// Make async POST request
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
     // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
    console.log("error", error);
    }
}