import "izitoast/dist/css/iziToast.min.css";
import iziToast from 'izitoast';



const inputDelay = document.querySelector('input[name="delay"]');

const form = document.querySelector(".form");

const radioFulfilled = document.querySelector("#fulfilled");
const radioRejected = document.querySelector("#rejected");


form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const delay = inputDelay.value
    const prom = new Promise((resolve, reject) =>{
        setTimeout(() => {
            if(radioFulfilled.checked){
                resolve(delay)
            }else if(radioRejected.checked){
                reject(delay)
            }   
        }, delay);
    });

    prom
    .then((delay) =>{
        iziToast.show({
            title: 'OK',
            message: `Fulfilled promise in ${delay}ms`,
            color: "rgba(89, 161, 13, 1)",
            position: "topRight",
            icon: "fa fa-check"
        });
    })
    .catch((delay) =>{
        iziToast.show({
            title: 'Error',
            message: `Reject promise in ${delay}ms`,
            position: "topRight",
            color: "rgba(239, 64, 64, 1)",
            icon: "fas fa-exclamation-circle"
        });
    })
})




