//pop down function
let body = document.querySelector("body")
let popDown = document.querySelector(".cancel")
popDown.addEventListener("click", ()=>{
    document.querySelector('.main').remove()
})

let overlap_popDown = document.querySelector(".overlap-box");
overlap_popDown.addEventListener("click", ()=>{
    document.querySelector('.main').remove()

})

//copy coupon code function
let copyButton = document.querySelector(".copy-code-button")
copyButton.addEventListener("click", ()=>{
    let textToCopy = document.querySelector(".coupon-code").innerText;
    navigator.clipboard.writeText(textToCopy)
    copyButton.innerText = "Copied";
})

let dayBox_1 = document.querySelector("#day-box-1");
let dayBox_2 = document.querySelector("#day-box-2");
let hourBox_1 = document.querySelector("#hour-box-1");
let hourBox_2 = document.querySelector("#hour-box-2");
let minuteBox_1 = document.querySelector("#minute-box-1")
let minuteBox_2 = document.querySelector("#minute-box-2")
let secondBox_1 = document.querySelector("#sec-box-1")
let secondBox_2 = document.querySelector("#sec-box-2")

//offer timing function
let second =  111618;
let day = 0
let hour = 0;
let minute = 0;

let timer = setInterval(()=>{
    second--;
    if(second >= 86400){
        day = Math.floor(second / 86400);
        second = second - (day * 86400);
    }
    
    if(second >= 3600){
        hour = Math.floor(second / 3600);
        second = second - (hour * 3600);
    }
    
    if(second >= 60){
        minute = Math.floor(second / 60);
        second = second - (minute * 60);
    }

    if(second < 0){
        minute--;
        second = 59;
    }

    if(minute < 0){
        hour--;
        minute = 59;
    }

    if(hour < 0){
        day--;
        hour = 23;
    }

    let days = day + "";
    let hours = hour + "";
    let minutes = minute + "";
    let seconds = second + "";

    if(days.length === 2){
        dayBox_1.innerText = days[0];
        dayBox_2.innerText = days[1];
    }else if(days.length === 1){
        dayBox_1.innerText = 0;
        dayBox_2.innerText = days[0];
    }

    if(hours.length === 2){
        hourBox_1.innerText = hours[0];
        hourBox_2.innerText = hours[1];
    }else if(hours.length === 1){
        hourBox_1.innerText = 0;
        hourBox_2.innerText = hours[0];
    }

    if(minutes.length === 2){
        minuteBox_1.innerText = minutes[0];
        minuteBox_2.innerText = minutes[1];
    }else if(minutes.length === 1){
        minuteBox_1.innerText = 0;
        minuteBox_2.innerText = minutes[0];
    }

    if(seconds.length === 2){
        secondBox_1.innerText = seconds[0];
        secondBox_2.innerText = seconds[1];
    }else if(seconds.length === 1){
        secondBox_1.innerText = 0;
        secondBox_2.innerText = seconds[0];
    }
    //console.log(day, hour, minute, second)

},1000)