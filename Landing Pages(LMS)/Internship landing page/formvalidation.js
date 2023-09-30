const form =document.getElementById('form');
const firstname =document.getElementById('firstname');
const lastname =document.getElementById('lastname');
const phonenumber =document.getElementById('phonenumber');
const email =document.getElementById('email');
const startingdate = document.getElementById('startingdate');
const monthsnumber = document.getElementById('monthsnumber');
form.addEventListener('submit',e =>{
    e.preventDefault();

    validateInputs();
});

const setError =(element,message)=>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText=message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}
const setSuccess = element =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText='';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};