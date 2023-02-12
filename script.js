const key = "3dee8b3b77c4b05e339ad9a72d8a8518";
window.addEventListener("load",function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(pos){
            const lat=pos.coords.latitude;
            const lon=pos.coords.longitude;
            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`

            fetch(url)
            .then(function(res){
                return res.json();
            })
            .then(function(data){
                getForecast(data.name);
                getData(data);       
            })

        })
    }
})

const btn=document.querySelector("#searchBtn")
const inp=document.querySelector("#cityName")
btn.addEventListener("click",function(){
    // console.log("done")
    let inp=document.querySelector("#cityName").value;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${key}&units=metric`
        fetch(url)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            getForecast(data.name);
            getData(data);       
        })
        document.querySelector("#cityName").value='';


})
function getData(data){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log(data)
    let mydate=new Date(data.dt*1000)
    document.querySelector(".card").style.display="block";
    document.querySelector("#logo").src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.querySelector(".city").textContent=data.name+", "+data.sys.country;
    document.querySelector(".date").textContent=weekday[mydate.getDay()]+", "+mydate.getDate()+" "+months[mydate.getMonth()]+" "+mydate.getFullYear();
    document.querySelector(".temp").textContent=Math.floor(data.main.temp)+" °C";
    document.querySelector(".desc").textContent=data.weather[0].description;
    document.querySelector("#min").textContent=Math.floor(data.main.temp_max)+" °C";
    document.querySelector("#max").textContent=Math.ceil(data.main.temp_max)+" °C";
    document.querySelector(".humid").textContent=data.main.humidity+"%";
    document.querySelector(".press").textContent=Math.floor((data.main.pressure)/33.8639)+" Hg";
    document.querySelector(".wind").textContent=data.wind.speed+" Kmph";  
}
function getForecast(city){
    const urlLink=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${key}`;
    fetch(urlLink)
    .then(function(resp){
        return resp.json();
    })
    .then(function(info){
        console.log(info);
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        console.log(info)
        let mydatex=new Date(info.list[8].dt*1000)
        document.querySelector("#ax").innerHTML=`${mydatex.getDate()} ${months[mydatex.getMonth()]}`
        document.querySelector("#bx").innerHTML=`${Math.ceil(info.list[8].main.temp_min)-273}°C/${Math.floor(info.list[8].main.temp_max)-273}°C`
        document.querySelector("#cx").innerHTML=`${info.list[8].weather[0].main}`
        let mydatey=new Date(info.list[16].dt*1000)
        document.querySelector("#ay").innerHTML=`${mydatey.getDate()} ${months[mydatey.getMonth()]}`
        document.querySelector("#by").innerHTML=`${Math.ceil(info.list[16].main.temp_min)-273}°C/${Math.floor(info.list[16].main.temp_max)-273}°C`
        document.querySelector("#cy").innerHTML=`${info.list[16].weather[0].main}`
        let mydatez=new Date(info.list[24].dt*1000)
        document.querySelector("#az").innerHTML=`${mydatez.getDate()} ${months[mydatez.getMonth()]}`
        document.querySelector("#bz").innerHTML=`${Math.ceil(info.list[24].main.temp_min)-273}°C/${Math.floor(info.list[24].main.temp_max)-273}°C`
        document.querySelector("#cz").innerHTML=`${info.list[24].weather[0].main}`
    })
}