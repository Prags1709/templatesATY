let cancel_button = document.querySelector(".banner-handler>svg")
cancel_button.addEventListener("click", () => {
    document.querySelector(".banner-box-1-wrapper").remove()
})

let day_box = document.querySelector(".banner-timer-days-count");
let hour_box = document.querySelector(".banner-timer-hours-count");
let minute_box = document.querySelector(".banner-timer-minutes-count");
let second_box = document.querySelector(".banner-timer-seconds-count")

//timer function
let second = 10;
let day = 0
let hour = 0;
let minute = 0;

let timer = setInterval(() => {
    second--;
    if (second >= 86400) {
        day = Math.floor(second / 86400);
        second = second - (day * 86400);
    }

    if (second >= 3600) {
        hour = Math.floor(second / 3600);
        second = second - (hour * 3600);
    }

    if (second >= 60) {
        minute = Math.floor(second / 60);
        second = second - (minute * 60);
    }

    if (second < 0) {
        minute--;
        second = 59;
    }

    if (minute < 0) {
        hour--;
        minute = 59;
    }

    if (hour < 0) {
        day--;
        hour = 23;
    }

    if(day===0 && hour===0 && minute===0&& second===0){
        stopTimer()
    }

    let days = day + "";
    let hours = hour + "";
    let minutes = minute + "";
    let seconds = second + "";

    if (days.length === 2) {
        day_box.innerText = days;
    } else if (days.length === 1) {
        day_box.innerText = "0" + days;
    }

    if (hours.length === 2) {
        hour_box.innerText = hours;
    } else if (hours.length === 1) {
        hour_box.innerText = "0" + hours;
    }

    if (minutes.length === 2) {
        minute_box.innerText = minutes;
    } else if (minutes.length === 1) {
        minute_box.innerText = "0" + minutes;
    }

    if (seconds.length === 2) {
        second_box.innerText = seconds;
    } else if (seconds.length === 1) {
        second_box.innerText = "0" + seconds;
    }
}, 1000)

function stopTimer(){
    clearInterval(timer)
}

let close_toaster = document.querySelector(".toaster-close-x>svg")
close_toaster.addEventListener("click", () => {
    document.querySelector(".toaster-container-1").remove()
})