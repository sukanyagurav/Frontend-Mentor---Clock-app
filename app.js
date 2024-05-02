const quote = document.getElementById('quote')
const author= document.getElementById('quote_author')
const btn_refresh= document.getElementById('refresh')

const lblcurrentTime = document.querySelector('.currentTime')

async function getQuote(){
    const res = await fetch('https://api.quotable.io/random/')
    if(!res.ok){
        quote.innerHTML = 'Please try again after sometime'
    }
    const data = await res.json()
    quote.classList.add('textAnimation')
    author.classList.add('textAnimation')
    quote.innerHTML=`"${data.content}"`
    author.innerHTML=`<i>-${data.author || 'Unknown'}</i>`
    setTimeout(()=>{
        quote.classList.remove('textAnimation')
        author.classList.remove('textAnimation')
    },1000)
  
}
btn_refresh.addEventListener('click',getQuote)
let interval
async function getTime(){
    clearInterval(interval)
    const currentTime = new Date()
    const hours = currentTime.getHours()
    const minutes= currentTime.getMinutes()
    const seconds= currentTime.getSeconds()
    let greet = '';
    if (hours >= 5 && hours <= 11) {
        greet = 'morning';
        document.querySelector('.period').innerHTML= 'AM'
    } else if (hours >= 12 && hours <= 17) {
      greet = 'afternoon';
      document.querySelector('.period').innerHTML= 'PM'
    } else if(hours >=18 && hours <=20){
        greet="evening"
        document.querySelector('.period').innerHTML= 'pM'
    }
    else {
      greet = 'night';
      document.querySelector('.period').innerHTML= 'PM'
    }

    if(hours >= 5 && hours <= 17 ){
        document.querySelector('.greet_image').src='./assets/desktop/icon-sun.svg'
    }else{
        document.querySelector('.greet_image').src='./assets/desktop/icon-moon.svg'
    }
    document.querySelector('.greeting_text').innerHTML = `good ${greet}, `

    lblcurrentTime.innerHTML= `${hours.toString().padStart(2,"0")} : ${minutes.toString().padStart(2,"0")}`
	
    if (hours >= 5 && hours <= 17 ) {
        document.body.classList.remove('nightTime')
		document.body.classList.add('daytime')
      
	} else {
		document.body.classList.add('nightTime')
        document.body.classList.remove('daytime')
	}
   interval = setInterval(()=>{
        getTime()
    },60 * seconds)
  
}
const lblLocation = document.querySelector('.detailed_location')
const day_of_the_year = document.querySelector('.day_of_the_year')
const day_of_the_week = document.querySelector('.day_of_the_week')
const week_number = document.querySelector('.week_number')
const abbreviation = document.querySelector('.abbreviation')
const region = document.querySelector('.region')
const moreInfo = document.getElementById('moreInfo')

async function getTimeZone(){
    const timeRes = await fetch(`http://worldtimeapi.org/api/ip`)
    const timeData = await timeRes.json()
   
    lblLocation.innerHTML = timeData.timezone
    day_of_the_year.innerHTML=timeData.day_of_year
    day_of_the_week.innerHTML = timeData.day_of_week
    week_number.innerHTML = timeData.week_number
    abbreviation.innerHTML = timeData.abbreviation
    const regionRes = await fetch('https://api.ipbase.com/v1/json/')
    const data = await regionRes.json()
    region.innerHTML = `In ${data.region_name}, ${data.country_code}`
}
getQuote()
getTimeZone()
getTime()
moreInfo.addEventListener('click',()=>{
    document.querySelector('main').classList.toggle('more')
    if( document.querySelector('main').classList.contains('more')){
        document.querySelector('.text').innerHTML = 'Less'
        document.querySelector('.arrow').style.transform = 'rotate(0deg)'
    }
    else{
        document.querySelector('.text').innerHTML = 'more'
        document.querySelector('.arrow').style.transform = 'rotate(180deg)'
    }
})