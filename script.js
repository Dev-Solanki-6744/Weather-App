const usertab=document.querySelector("[data-userWeater]")
const searchtab=document.querySelector("[data-SearchWeather]")
const userContainer=document.querySelector(".weather-container")
const grantAccessContiner=document.querySelector(".grant-location-container")
const searchForm=document.querySelector("[data-search-form]")
const loadingScreen=document.querySelector(".loading-container")
const userInfoContainer=document.querySelector(".user-info-container")


// intially api key varibale
// current tab varible
let currentTab=usertab;
const Api_key="6b092714ba9a0f98ace901e8c967d285";
currentTab.classList.add("current-tab");
getfromSessionStorage(); 
// event listener for user tab

function switchTab(clickedtab){
    if(clickedtab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedtab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContiner.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }


    }
}

usertab.addEventListener("click",()=>{
    switchTab(usertab);
})

searchtab.addEventListener("click",()=>{
    switchTab(searchtab);
})

function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContiner.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}
async function fetchUserWeatherInfo(coordinates){
    const lat=coordinates.lat;
    const lon=coordinates.lon;
   
    grantAccessContiner.classList.remove("active");
    loadingScreen.classList.add("active");
    try{
        const response= await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Api_key}`
        );
        const data= await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        console.log(err);
    }
}

function renderWeatherInfo(weatherInfo){
    // firstly, we have to fetch element
    const cityName=document.querySelector("[data-cityName]");
    const countyIcon=document.querySelector("[data-countryIcon]");
    const dsec=document.querySelector("[data-WeaterDisc]");
    const weatherIcon=document.querySelector("[data-weatherImage]");
    const temp=document.querySelector("[data-temp]");
    const windSpeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");


    // fectch every thing fron data
    // user?.address?.zip optional chaining operator
    cityName.innerText=weatherInfo?.name;
    countyIcon.src=`https://flagcdn.com/16x12/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    dsec.innerText=weatherInfo?.weather[0]?.description;
    weatherIcon.src=`https://openweathermap.org/img/wn/${weatherInfo?.weather[0]?.icon}.png`;
    const atkb=weatherInfo?.main?.temp;
    temp.innerText=Math.round(atkb-273.15)+"°C";
    windSpeed.innerText=weatherInfo?.wind?.speed+" m/s";
    humidity.innerText=weatherInfo?.main?.humidity+"%";
    cloudiness.innerText=weatherInfo?.clouds?.all+"%";
    userInfoContainer.classList.add("active");
}




function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
        }
        else{
            console.log("location not available");
        }
}

const grantAccessButton=document.querySelector("[grant-location]");
grantAccessButton.addEventListener("click", getLocation);

function showPosition(position){
    const coordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(coordinates));
    fetchUserWeatherInfo(coordinates);
}




let searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchCity=searchInput.value;
    if(searchCity==""){
        return;
    }else{
        fetchSearchWeatherInfo(searchCity);
    }
});
 
async function fetchSearchWeatherInfo(searchCity){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContiner.classList.remove("active");
    try{
        const response= await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${Api_key}`
        );
        const data= await response.json();
        loadingScreen.classList.remove("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        alert("give a correct name")
    }
}
