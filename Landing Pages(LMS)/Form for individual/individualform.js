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
const isValidEmail = email =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validateInputs =()=>{
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const phonenumberValue = phonenumber.value.trim();
    const emailValue = email.value.trim();
    const startingdateValue =startingdate.value;
    const monthsnumberValue =monthsnumber.value;

    //firstname validation
    if(firstnameValue===''){
        setError(firstname, '*Firstname is required');
    }
    else{
        setSuccess(firstname);
    }
        //  Email-validation
    if(emailValue===''){
        setError(email, '*Email is required');
    } 
    else if (!isValidEmail(emailValue)){
        setError(email, '*Provide a valid email address');
    }
    else{
        setSuccess(email);
    }
       //lastname validation
    if(lastnameValue===''){
        setError(lastname, '*Lastname is required');
    }
    else{
        setSuccess(lastname);
    }
    //phoneNumber Validation
    if(phonenumberValue===''){
        setError(phonenumber, '*Phone Number is required');
    }
    // else if(phonenumberValue){
    //     setError(phonenumber, 'Please Provide a valid Phone Number');
    // }
    else{
        setSuccess(phonenumber);
    }
    //Select DateofInternship
    if(lastnameValue===''){
        setError(lastname, '*Lastname is required');
    }
    else{
        setSuccess(lastname);
    }

    if(startingdateValue===''){
        setError(startingdate, '*Date is required');
    }
    else{
        setSuccess(startingdate);
    }
    if(monthsnumberValue===''){
        setError(monthsnumber, '*Months is required');
    }
    else{
        setSuccess(monthsnumber);
    }
};