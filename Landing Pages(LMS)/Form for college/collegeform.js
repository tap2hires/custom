const form1 =document.getElementById('form1');
const studentname =document.getElementById('studentname');
const positiontitle =document.getElementById('positiontitle');
const studentphonenumber =document.getElementById('studentphonenumber');
const studentemailid = document.getElementById('studentemailid');
const nameofcollege = document.getElementById('nameofcollege');
const Durationmonths = document.getElementById('Durationmonths');
const startingdateofinternship = document.getElementById('startingdateofinternship');
const endingdateofinternship = document.getElementById('endingdateofinternship');
form1.addEventListener('submit',e =>{
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

const validateInputs =()=>{
    const studentnameValue = studentname.value.trim();
    const positiontitleValue = positiontitle.value.trim();
    const studentphonenumberValue = studentphonenumber.value.trim();
    const studentemailidValue = studentemailid.value.trim();
    const nameofcollegeValue =nameofcollege.value.trim();
    const DurationmonthsValue =Durationmonths.value.trim();
    const startingdateofinternshipValue =startingdateofinternship.value;
    const endingdateofinternshipValue =endingdateofinternship.value;

    //Studentname validation
    if(studentnameValue===''){
        setError(studentname, 'Student Name is required');
    }
    else{
        setSuccess(studentname);
    }
    //positiontitle Validation
    if(positiontitleValue===''){
        setError(positiontitle, 'Position/Title is required');
    }
    else{
        setSuccess(positiontitle);
    }

     //phoneNumber Validation
     if(studentphonenumberValue===''){
        setError(studentphonenumber, 'Student PhoneNumber is required');
    }
    else if(studentphonenumberValue>10){
        setError(studentphonenumber, 'Please Provide a valid Phone Number');
    }
    else{
        setSuccess(studentphonenumber);
    }
    //studentemailid Validation
    if(studentemailidValue===''){
        setError(studentemailid, 'Student Email-Id is required');
    }
    else{
        setSuccess(studentemailid);
    }
    //nameofcollege Validation
    if(nameofcollegeValue===''){
        setError(nameofcollege, 'College Name is required');
    }
    else{
        setSuccess(nameofcollege);
    }
     //Durationmonths validATION
    if(DurationmonthsValue===''){
        setError(Durationmonths, 'Months is required');
    }
    else{
        setSuccess(Durationmonths);
    }
    //startingdateofinternship Validation
    if(startingdateofinternshipValue===''){
        setError(startingdateofinternship, 'Date is required');
    }
    else{
        setSuccess(startingdateofinternship);
    }
    //endingdateofinternship Validation
    if(endingdateofinternshipValue===''){
        setError(endingdateofinternship, 'Date is required');
    }
    else{
        setSuccess(endingdateofinternship);
    }

};