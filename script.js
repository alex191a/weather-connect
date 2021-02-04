
let cityid = '2610319'
let apiKey = 'fd683edb52dd1e3e043c3cb63e8af8ad'
let unit = 'metric';
let url = 'https://api.openweathermap.org/data/2.5/weather?id='+cityid+'&appid='+apiKey+'&units='+unit;
let apiCall = fetch(url);
let promise = apiCall.then(data => data.json())
let jsObj = {name:'viborg', data:promise};
let citylist=[];
citylist.push(jsObj)

function test(){
    document.getElementById('geo').addEventListener('click',function(){locations()})
    displayData()
}
function selection(){
    cityid = document.getElementById('citys').value;
    api(cityid)
}
function input(){
    cityid = document.getElementById('city').value;
    console.log(cityid)
    api(cityid)
}
function api(city){
    let run = true;
    cityid = city.toLowerCase()
    
    for( i = 0;i < citylist.length;i++)
    {
        console.log(citylist[i].name)
        if (citylist[i].name == cityid)
        {
            console.log(citylist[i].name)
            promise = citylist[i].data
            run =false
            break;
        }
    }
    if (run)
    {
        urll(cityid)
        apiCall = fetch(url)
        promise = apiCall.then(data => data.json())
        jsObj = {name: cityid , data: promise}
        let newcy = document.createElement("OPTION")
        newcy.innerHTML = cityid;
        newcy.setAttribute("values",cityid)
        document.getElementById('citys').appendChild(newcy)
        citylist.push(jsObj)
    }
    displayData()
}
function displayData(){
    promise.then(data=>document.getElementById("string").innerHTML = "Temperaturen er: " + data.main.temp)
    promise.then(data =>document.getElementById('feels').innerHTML = "Det føles som: " + data.main.feels_like);
    promise.then(data=>document.getElementById("min").innerHTML = "Laveste temperatur: " + data.main.temp_min);
    promise.then(data=>document.getElementById("max").innerHTML = "Højeste temperatur: " + data.main.temp_max);
    promise.then(data=>document.getElementById("weather").innerHTML = "Vejret: " + data.weather[0].main);
    promise.then(data=>document.getElementById("des").innerHTML = "Beskrivelse: " + data.weather[0].description);
}
function urll(city){
    url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units='+unit;
}
function locations(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        alert('Browser er inkompatipel med denne funktion');
    }
}
function showPosition(position){
    url = 'https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid='+apiKey+'&units='+unit;
    apiCall = fetch(url)
    promise = apiCall.then(data => data.json())
    displayData();
}
