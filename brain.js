$(document).ready(() => {
    let wrapper = document.getElementById('wrapper2')
    let waqt = document.getElementById('time')
    let time;
    let minute, hour;
    let zone = "";
    setInterval(() => {
        time = new Date();
        if (time.getHours() >= 12) {
            zone = "PM"
        }
        else {
            zone = "AM"
        }
        if (time.getHours() > 12) {
            hour = time.getHours() - 12;

        }
        else {
            hour = time.getHours();
        }
        if (hour == 12) {
            hour = 0;
        }
        if (time.getMinutes() < 10) {
            minute = `0${time.getMinutes()}`;
        }
        else {
            minute = time.getMinutes();
        }
        waqt.innerHTML = `${hour}:${minute}:${time.getSeconds()} ${zone}`
    }, 1000)
    let set = document.getElementById('set')
    set.addEventListener('click', () => {
        let hourInput = document.getElementById('hourInput');
        let minuteInput = document.getElementById('minuteInput');
        let meridian = document.getElementById('meridian');
        if (hourInput.value > 24 || minuteInput.value > 60 || meridian.value.toUpperCase() != "PM" && meridian.value.toUpperCase() != "AM") {
            $('.container-alert').html(`<div class="alert">
                Invalid Time
                </div>`)
            $('.container-alert').slideUp(8000)
            document.getElementById('form').reset()
        }
        else {
            if (time.getHours() >= 12) {
                zone = "PM"
            }
            else {
                zone = "AM"
            }
            console.log(meridian.value);
            let currentTime;
            let currentMinute;
            if (hourInput.value > 12) {
                currentTime = hourInput.value - 12;
            }
            else {
                currentTime = hourInput.value;
            }

            if (minuteInput.value < 10) {
                currentMinute = `0${minuteInput.value}`
            }
            else {
                currentMinute = minuteInput.value
            }
            wrapper.innerHTML = `<h1>${currentTime}:${currentMinute} ${zone}</h1>`
            let audio = new Audio('alarm.wav')
            ring(audio, hourInput.value, minuteInput.value, meridian.value.toUpperCase());
            document.getElementById('form').reset();
        }
    });

    function ring(audio, hourVal, minutaVal, meridian) {
        let x;
        console.log(time.getHours(), Number(hourVal) + 12);
        if (zone == "PM") {

            if (time.getMinutes() == minutaVal && time.getHours() == Number(hourVal) + 12 && meridian == zone) {
                x = setInterval(() => {
                    audio.play();

                }, 100)
                setTimeout(() => {
                    clearInterval(x)
                    $('#wrapper2').fadeOut(1000);
                }, 10000)
            }
        }
        else {
            if (time.getMinutes() == minutaVal && time.getHours() == Number(hourVal) && meridian == zone) {
                x = setInterval(() => {
                    audio.play();

                }, 100)
                setTimeout(() => {
                    clearInterval(x)
                    $('#wrapper2').fadeOut(1000);
                }, 10000)
            }
        }
        $('#set2').click(() => {
            clearInterval(x)
            $('h1').fadeOut(1000);
        });
    }
})
