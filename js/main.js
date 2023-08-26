
const search = document.getElementById('search');
let locationData ={};
let currentData ={};
let forecast =[];
async function getApiData(cityName="cairo") {
    let https =  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ed2927ab10f64448b0d223832232108&q=${cityName}&days=3`);
    let response  = await https.json();
    locationData= response.location;
    currentData= response.current;
    forecast= response.forecast;
    Display();
}
navigator.geolocation.watchPosition(function(position){
console.log(position);
},
function(err){
    console.log(err);

}
)
getApiData();


function Display() {
    let date1 = new Date(currentData.last_updated);
    let day1 = date1.getDate();
    let weekday1= date1.toLocaleDateString("en-US" , {weekday : "long"})
    let month1= date1.toLocaleDateString("en-US" , {month : "long"})
    firstCol=`
    
    <div class="head d-flex justify-content-between ">
        <span>${weekday1}</span>
        <span>${day1 +month1 }</span>
    </div>
    <div class="content">
        <div class="country">${locationData.name}</div>
        <div class="degree">
            <div class="num ">${currentData.temp_c} <sup>o</sup> C</div>
            <div class="icon me-3">
                <img src="${currentData.condition.icon}" alt="photo not found" class="w-100" >
            </div> 
        </div>
        <div class="custom">${currentData.condition.text}</div>
        <div class="icons">
            <span><i class="fa-solid fa-umbrella"></i>${currentData.humidity}%</span>
            <span><i class="fa-solid fa-wind"></i> ${currentData.wind_kph}km/h </span>
            <span><i class="fa-regular fa-compass"></i> ${currentData.wind_dir}</span>
        </div>
    </div>
    
    `
    let date2 = new Date(forecast.forecastday[1].date);
    let weekday2= date2.toLocaleDateString("en-US" , {weekday : "long"})
    secondeCol= `
    
    <div class="head text-center ">
        <span>${weekday2}</span>
    </div>
    <div class="content mt-4">
        <div class="degree d-flex justify-content-center align-items-center flex-column">
            <div class="icon me-3">
                <img src="${forecast.forecastday[1].day.condition.icon}" alt="photo not found" class="w-100 " >
            </div> 
            <div class="num ">${forecast.forecastday[1].day.maxtemp_c} <sup>o</sup> C</div>
        </div>
        <div class="text-center mb-4">
            
            <small >${forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
        </div>
        <div class="custom text-center">${forecast.forecastday[1].day.condition.text}</div>
    </div>

    
    `
    let date3 = new Date(forecast.forecastday[2].date);
    let weekday3= date3.toLocaleDateString("en-US" , {weekday : "long"})
    thirdCol= `
    <div class="head text-center ">
        <span>${weekday3}</span>
    </div>
    <div class="content mt-4">
        <div class="degree d-flex justify-content-center align-items-center flex-column">
            <div class="icon me-3">
                <img src="${forecast.forecastday[2].day.condition.icon}" alt="photo not found" class="w-100 " >
            </div> 
            <div class="num ">${forecast.forecastday[2].day.maxtemp_c} <sup>o</sup> C</div>
        </div>
        <div class="text-center mb-4">
            
            <small >${forecast.forecastday[2].day.mintemp_c} <sup>o</sup></small>
        </div>
        <div class="custom text-center">${forecast.forecastday[2].day.condition.text}</div>
    </div>
    `
    document.getElementById('col1').innerHTML= firstCol;
    document.getElementById('col2').innerHTML= secondeCol;
    document.getElementById('col3').innerHTML= thirdCol;
}

search.addEventListener('input', function(){
    getApiData(search.value);
})

setTimeout(() => {
    console.log("Holaaaa");
}, 3000);