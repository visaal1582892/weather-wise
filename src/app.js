// Importing Weather Icons Object from another file
import { weatherIconsCommonURL, weatherIcons } from './iconData.js'

var current=1;

// Functions For Handling Switching Of forecast data cards
    function right(){
        let currentDay=document.getElementById(`id${current}`);
    currentDay.classList.remove('flex');
    currentDay.classList.add('hidden');
        current=(current<5)?current+1:1;
        let newDay=document.getElementById(`id${current}`);
    newDay.classList.remove('hidden');
    newDay.classList.add('flex');
    }
    function left(){
        let currentDay=document.getElementById(`id${current}`);
    currentDay.classList.remove('flex');
    currentDay.classList.add('hidden');
        current=(current>1)?current-1:5;
        let newDay=document.getElementById(`id${current}`);
    newDay.classList.remove('hidden');
    newDay.classList.add('flex');
    }
    function leftEnd(){
        let currentDay=document.getElementById(`id${current}`);
    currentDay.classList.remove('flex');
    currentDay.classList.add('hidden');
        current=1;
        let newDay=document.getElementById(`id${current}`);
    newDay.classList.remove('hidden');
    newDay.classList.add('flex');
    }
    function rightEnd(){
        let currentDay=document.getElementById(`id${current}`);
    currentDay.classList.remove('flex');
    currentDay.classList.add('hidden');
        current=5;
        let newDay=document.getElementById(`id${current}`);
    newDay.classList.remove('hidden');
    newDay.classList.add('flex');
    }

// Function Used To Display All the data in a good FormData.
function display(currWeatherData, forecastData){
    const currWeatherDisplay=document.getElementById('currWeatherDisplay');
    const currWeatherNames=["City", "Region", "Country", "Date", "Temp", "Wind", "Humidity"];
    if(currWeatherDisplay.classList.contains('hidden')){
        currWeatherDisplay.classList.remove('hidden');
        currWeatherDisplay.classList.add('flex');
    }
    currWeatherDisplay.querySelector('article#content').innerHTML=`
                <figure class="flex flex-nowrap justify-around items-center h-[25%] w-[100%] rounded-2xl bg-slate-700 p-2 shadow-2xl">
                    <h3 class="font-poppins text-2xl font-medium text-orange-500 col-span-6 tracking-wider">${currWeatherData["Description"]}
                    </h3>
                    <img class="col-span-9 w-[50%] h-[80%]" src=${weatherIconsCommonURL}/${weatherIcons[currWeatherData['Code']]} alt="weatherButton">
                </figure>
                <section class="w-[100%] grid grid-cols-15">
                    ${currWeatherNames.map((name) => `<h3 class="font-poppins text-xl font-medium text-orange-500 col-span-5">${name}</h3>
                    <p class="font-poppins text-2xl font-semibold text-orange-500 col-span-1">:</p>
                    <p class="font-poppins text-xl font-medium col-span-9 text-slate-800">${currWeatherData[name]} ${(name=="Temp")?"°C":(name=="Wind")?"kph":(name=="Humidity")?"%":""}</p>`).join(``)}
                </section>`;
    const forecastWeatherDisplay=document.getElementById("forecastWeatherDisplay");
    const forecastWeatherNames=["Date", "Temp", "Wind", "Humidity", "RainChance", "SnowChance"];
    if(forecastWeatherDisplay.classList.contains('hidden')){
        forecastWeatherDisplay.classList.remove('hidden');
        forecastWeatherDisplay.classList.add('flex');
    }
    forecastWeatherDisplay.innerHTML+=`${forecastData.map((dayData, index)=>`<article class="h-[70%] w-[87%] rounded-xl border-2 border-dashed p-4 ${(index+1==1)?`flex`:`hidden`} flex-wrap justify-between" id=id${index+1}>
                <figure class="flex flex-nowrap justify-around items-center h-[25%] w-[100%] rounded-2xl bg-slate-700 p-2 shadow-2xl">
                    <h3 class="font-poppins text-2xl font-medium text-orange-500 col-span-6 tracking-wider">${dayData["Description"]}
                    </h3>
                    <img class="col-span-9 w-[50%] h-[80%]" src=${weatherIconsCommonURL}/${weatherIcons[dayData['Code']]} alt="weatherButton">
                </figure>
                <section class="w-[100%] grid grid-cols-15">
                    ${forecastWeatherNames.map((name) => `<h3 class="font-poppins text-xl font-medium text-orange-500 col-span-7">${name} ${(name=="Date")?`(Day-${index+1})`:``}</h3>
                    <p class="font-poppins text-2xl font-semibold text-orange-500 col-span-1">:</p>
                    <p class="font-poppins text-xl font-medium col-span-7 text-slate-800">${dayData[name]} ${(name=="Temp")?"°C":(name=="Wind")?"kph":(name=="Humidity")?"%":""}</p>`).join(``)}
                </section>
            </article>`).join(``)}
            <section id="daysNavigation" class="flex justify-around items-center h-[6%] w-[80%]">
                <button class="bg-slate-700 rounded-full h-[100%] p-2" id="leftEndArrowButton">
                    <img src="./public/images/leftEndArrowIcon.png" alt="leftEndArrowIcon" class="h-[100%]">
                </button>
                <button class="bg-slate-700 rounded-full h-[100%] p-2" id="leftArrowButton">
                    <img src="./public/images/leftArrowIcon.png" alt="leftArrowIcon" class="h-[100%]">
                </button>
                <button class="bg-slate-700 rounded-full h-[100%] p-2" id="rightArrowButton">
                    <img src="./public/images/rightArrowIcon.png" alt="rightArrowIcon" class="h-[100%]">
                </button>
                <button class="bg-slate-700 rounded-full h-[100%] p-2" id="rightEndArrowButton">
                    <img src="./public/images/rightEndArrowIcon.png" alt="rightEndArrowIcon" class="h-[100%]">
                </button>
            </section>`;
    const leftEndArrowButton=document.getElementById("leftEndArrowButton");
    const leftArrowButton=document.getElementById("leftArrowButton");
    const rightArrowButton=document.getElementById("rightArrowButton");
    const rightEndArrowButton=document.getElementById("rightEndArrowButton");
    leftEndArrowButton.addEventListener('click', leftEnd);
    leftArrowButton.addEventListener('click', left);
    rightArrowButton.addEventListener('click', right);
    rightEndArrowButton.addEventListener('click', rightEnd);
}

// Function To Fetch The Data Using CityName
async function fetchWeatherData(cityName){
    let response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3ca8bd6d736c4e72983160301250902&q=${cityName}&days=6&aqi=no&alerts=no`);
    let jsonResponse=await response.json();
    const currWeatherData=await {
        City: jsonResponse.location.name,
        Region: jsonResponse.location.region,
        Country: jsonResponse.location.country,
        Date: jsonResponse.forecast.forecastday[0].date,
        Temp: jsonResponse.current.temp_c,
        Wind: jsonResponse.current.wind_kph,
        Humidity: jsonResponse.current.humidity,
        Description: jsonResponse.current.condition.text,
        Code: jsonResponse.current.condition.code,
    };
    const forecastData=await [];
    for(let i=1; i<=5; i++){
        const member=await jsonResponse.forecast.forecastday[i];
        await forecastData.push({
            Date: member.date,
            Temp: member.day.avgtemp_c,
            Wind: member.day.maxwind_kph,
            Humidity: member.day.avghumidity,
            Description: member.day.condition.text,
            Code: member.day.condition.code,
            RainChance: member.day.daily_chance_of_rain,
            SnowChance: member.day.daily_chance_of_snow,
        })
    }
    await display(currWeatherData, forecastData);
}

// Function To Handle Search
function handleSearch(event){
    const cityName=event.target.parentNode.querySelector('input').value.trim();
    console.log(cityName);
    fetchWeatherData(cityName);
}

const searchButton=document.getElementById("searchButton");
searchButton.addEventListener('click', (event)=>handleSearch(event));