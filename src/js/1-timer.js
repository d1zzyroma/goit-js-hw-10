import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;
let userSelectedDateInSeconds;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const dateNow = new Date();
      if(selectedDates[0] <  dateNow){
        iziToast.show({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: "topRight",
            color: "rgba(239, 64, 64, 1)",
            icon: "fas fa-exclamation-circle"
        });
        dateBtn.disabled = true;
      }else{
        userSelectedDate = selectedDates[0];
        dateBtn.disabled = false; 
        userSelectedDateInSeconds = userSelectedDate.getTime()
      }
      
    },
    
  }; 

  
const dateInput = document.querySelector("#datetime-picker");
const dateBtn = document.querySelector("[data-start]")

const dateInputPicker = flatpickr(dateInput, options);

const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");


dateBtn.addEventListener("click", () =>{
    dateInput.disabled = true;
    dateBtn.disabled = true; 
    const timerId = setInterval(()=>{
        const currentTime = new Date().getTime();
        const timeRemaining = userSelectedDateInSeconds - currentTime;
        if (timeRemaining >= 0) {
            const time = convertMs(timeRemaining);
            dataDays.textContent = addLeadingZero(time.days);
            dataHours.textContent = addLeadingZero(time.hours);
            dataMinutes.textContent = addLeadingZero(time.minutes);
            dataSeconds.textContent = addLeadingZero(time.seconds);
        } else {
            clearInterval(timerId);
            dateInput.disabled = false;
            dateBtn.disabled = false; 
        }  
    },1000)
})


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  