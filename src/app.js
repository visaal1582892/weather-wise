// Storing Common Part of url seperately
const weatherIconsCommonURL="https://basmilius.github.io/weather-icons/production/fill/all/";

// Object Which Stores all the good weather icons
const weatherIcons={
    1000: "clear-day.svg",
    1003: "partly-cloudy-day.svg",
    1006: "cloudy.svg",
    1009: "overcast.svg",
    1030: "mist.svg",
    1063: "partly-cloudy-day-rain.svg",
    1066: "partly-cloudy-day-snow.svg",
    1069: "partly-cloudy-day-sleet.svg",
    1072: "partly-cloudy-day-drizzle.svg",
    1087: "thunderstorms-day.svg",
    1114: "snow.svg",
    1117: "snow.svg",
    1135: "fog.svg",
    1147: "fog.svg",
    1150: "drizzle.svg",
    1153: "drizzle.svg",
    1168: "drizzle.svg",
    1171: "drizzle.svg",
    1180: "partly-cloudy-day-rain.svg",
    1183: "rain.svg",
    1186: "partly-cloudy-day-rain.svg",
    1189: "rain.svg",
    1192: "partly-cloudy-day-rain.svg",
    1195: "rain.svg",
    1198: "rain.svg",
    1201: "rain.svg",
    1204: "sleet.svg",
    1207: "sleet.svg",
    1210: "partly-cloudy-day-snow.svg",
    1213: "snow.svg",
    1216: "partly-cloudy-day-snow.svg",
    1219: "snow.svg",
    1222: "partly-cloudy-day-snow.svg",
    1225: "snow.svg",
    1237: "sleet.svg",
    1240: "partly-cloudy-day-rain.svg",
    1243: "partly-cloudy-day-rain.svg",
    1246: "partly-cloudy-day-rain.svg",
    1249: "partly-cloudy-day-sleet.svg",
    1252: "sleet.svg",
    1255: "partly-cloudy-day-snow.svg",
    1258: "partly-cloudy-day-snow.svg",
    1261: "partly-cloudy-day-sleet.svg",
    1264: "partly-cloudy-day-sleet.svg",
    1273: "thunderstorms-day-rain.svg",
    1276: "thunderstorms-rain.svg",
    1279: "thunderstorms-day-snow.svg",
    1282: "thunderstorms-snow.svg"
}

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
                    <h3 class="font-poppins text-xl font-medium text-orange-500 col-span-6 tracking-wider">${currWeatherData["Description"]}
                    </h3>
                    <img class="col-span-9 w-[50%] h-[80%]" src=${weatherIconsCommonURL}/${weatherIcons[currWeatherData['Code']]} alt="weatherButton">
                </figure>
                <section class="w-[100%] grid grid-cols-15">
                    ${currWeatherNames.map((name) => `<h3 class="font-poppins text-xl font-medium text-orange-500 col-span-5 lg:text-xl">${name}</h3>
                    <p class="font-poppins text-2xl font-semibold text-orange-500 col-span-1 lg:text-2xl">:</p>
                    <p class="font-poppins text-xl font-medium col-span-9 text-slate-800 lg:text-xl lg:text-center">${currWeatherData[name]} ${(name=="Temp")?"°C":(name=="Wind")?"kph":(name=="Humidity")?"%":""}</p>`).join(``)}
                </section>`;
    const forecastWeatherDisplay=document.getElementById("forecastWeatherDisplay");
    const forecastWeatherNames=["City" ,"Date", "Temp", "Wind", "Humidity", "RainChance", "SnowChance"];
    if(forecastWeatherDisplay.classList.contains('hidden')){
        forecastWeatherDisplay.classList.remove('hidden');
        forecastWeatherDisplay.classList.add('flex');
    }
    forecastWeatherDisplay.innerHTML=`<h2 class="font-poppins text-3xl font-semibold text-orange-500 lg:text-2xl">5 Day Forecast</h2>
    ${forecastData.map((dayData, index)=>`<article class="h-[70%] w-[87%] rounded-xl border-2 border-dashed p-4 ${(index+1==1)?`flex`:`hidden`} flex-wrap justify-between" id=id${index+1}>
                <figure class="flex flex-nowrap justify-around items-center h-[25%] w-[100%] rounded-2xl bg-slate-700 p-2 shadow-2xl">
                    <h3 class="font-poppins text-xl font-medium text-orange-500 col-span-6 tracking-wider">${dayData["Description"]}
                    </h3>
                    <img class="col-span-9 w-[50%] h-[80%]" src=${weatherIconsCommonURL}/${weatherIcons[dayData['Code']]} alt="weatherButton">
                </figure>
                <section class="w-[100%] grid grid-cols-15">
                    ${forecastWeatherNames.map((name) => `<h3 class="font-poppins text-xl font-medium text-orange-500 col-span-7 lg:text-xl">${name} ${(name=="Date")?`(Day-${index+1})`:``}</h3>
                    <p class="font-poppins text-2xl font-semibold text-orange-500 col-span-1 lg:text-2xl">:</p>
                    <p class="font-poppins text-xl font-medium col-span-7 text-slate-800 lg:text-xl lg:text-center">${dayData[name]} ${(name=="Temp")?"°C":(name=="Wind")?"kph":(name=="Humidity"||name=="RainChance"||name=="SnowChance")?"%":""}</p>`).join(``)}
                </section>
            </article>`).join(``)}
            <section id="daysNavigation" class="flex justify-around items-center h-[6%] w-[70%]">
                <button class="forecastNavigation" id="leftEndArrowButton">
                    <img src="/public/images/leftEndArrowIcon.png" alt="leftEndArrowIcon" class="h-[100%]">
                </button>
                <button class="forecastNavigation" id="leftArrowButton">
                    <img src="/public/images/leftArrowIcon.png" alt="leftArrowIcon" class="h-[100%]">
                </button>
                <button class="forecastNavigation" id="rightArrowButton">
                    <img src="/public/images/rightArrowIcon.png" alt="rightArrowIcon" class="h-[100%]">
                </button>
                <button class="forecastNavigation" id="rightEndArrowButton">
                    <img src="/public/images/rightEndArrowIcon.png" alt="rightEndArrowIcon" class="h-[100%]">
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
    input.value="";
    setTimeout(()=>currWeatherDisplay.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      }), 200);
}

// Function To Fetch The Data Using CityName
async function fetchWeatherData(cityName){
    let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3ca8bd6d736c4e72983160301250902&q=${cityName}&days=6&aqi=no&alerts=no`);
    let add=await true;
    let jsonResponse=await response.json();
    const recentSearches=await JSON.parse(localStorage.getItem('recentSearches'))||[];
    for(let i of recentSearches){
        if(i.toLowerCase()==cityName.toLowerCase()){
            add=await false;
            break;
        }
    }
    if(add==true){
        recentSearches.unshift(cityName);
    }
    if(recentSearches.length>5){
        recentSearches.pop();
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
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
            City: currWeatherData["City"],
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
    fetchWeatherData(cityName);
}

// Function To Handle Capture Current Location Button
function handleCaptureLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(fetchUsingCoordinates, showError);
    }
    async function fetchUsingCoordinates(position){
        try{
            const {latitude, longitude} = await position.coords;
            const response=await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=bd4bd0edc5d1f3e3ab735b771789a712`)
            const jsonResponse=await response.json();
            fetchWeatherData(jsonResponse[0].name);
        }
        catch(error){
            console.log(error);
        }
    }
    function showError(error){
        console.log(error);
    }
}

// Function To Fill Input with Suggestion
function fillInput(event){
    input.value=event.target.textContent.trim();
    suggestionBox.classList.add('hidden')
}

// Function To Show Latest Searches
function showSuggestions(){
    const recentSearches=JSON.parse(localStorage.getItem('recentSearches'));
    if(recentSearches){
        suggestionBox.innerHTML=`${recentSearches.map((search)=>`<p class="w-[100%] h-10 md:h-16 flex items-center justify-start p-4 text-xl text-white font-poppins opacity-100 border-b-2 border-b-white rounded-xl active:scale-95 hover:bg-slate-900 suggestion">${search}</p>`).join(``)}`;
        const suggestions=document.querySelectorAll('.suggestion');
        suggestions.forEach((suggestion)=>suggestion.addEventListener('click', (event)=>fillInput(event)));
        if(suggestionBox.classList.contains('hidden')){
            suggestionBox.classList.remove('hidden')
        }
    }
}

// Function to top showing Suggestions
function unshowSuggestions(){
    setTimeout(()=>suggestionBox.classList.add('hidden'), 200);
}

// Functiuon To check If input being entered or not
function unshowSuggestionsAccordToInput(){
    if(input.value!=""){
        suggestionBox.classList.add('hidden');
    }
    else{
        suggestionBox.classList.remove('hidden');
    }
}

const inputBlock=document.querySelector('.inputBlock');
const suggestionBox=document.getElementById("suggestionBox");
const input=document.querySelector('input');
input.addEventListener('focus', showSuggestions);
input.addEventListener('blur', unshowSuggestions);
input.addEventListener('input', unshowSuggestionsAccordToInput);
const searchButton=document.getElementById("searchButton");
searchButton.addEventListener('click', (event)=>handleSearch(event));
const locationButton=document.getElementById("locationButton");
locationButton.addEventListener('click', handleCaptureLocation);
const scrollToForecastButton=document.querySelector('#scrollToForecast').addEventListener('click', ()=>{
    const forecastWeatherDisplay=document.getElementById('forecastWeatherDisplay');
    forecastWeatherDisplay.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
});
