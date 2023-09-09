
// JavaScript function to toggle the content
function toggleContent(divNumber) {
  for (var i = 1; i <= 5; i++) {
    var content = document.getElementById('content' + i);
    if (i === divNumber) {
      if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    } else {
      content.style.display = 'none'; // Hide other content divs
    }
  }
}




function updateEducationTemplate() {
  const educationList = document.getElementById('educationList');
  educationList.innerHTML = ''; // Clear existing entries

  // Iterate through all education sections
  const educationSections = document.querySelectorAll('.eduField');
  let index = 1; // Initialize an index for each entry

  educationSections.forEach((educationClone, fieldIndex) => {
    // Check if the current field is the last in a group of 4 (instituteName, degree, timePeriod, cgpa)
    if (fieldIndex % 4 === 0) {
      const instituteName = educationClone.value;
      const degree = educationSections[fieldIndex + 1].value;
      const timePeriod = educationSections[fieldIndex + 2].value;
      const cgpa = educationSections[fieldIndex + 3].value;

      // Create a new education element
      const educationElement = document.createElement('div');
      educationElement.classList.add('collegename');
      educationElement.innerHTML = `
        <h4><b>${instituteName}</b></h4>  
        <h6>${degree}</h6>
        <div class="row">
          <div class="col-md-6">
            <p>${timePeriod}</p>
          </div>
          <div class="col-md">
            <p>${cgpa}</p>
          </div>
        </div>
      `;

      // Append the education element to the education list
      educationList.appendChild(educationElement);

      // Update the index for the next set of fields
      index++;
    }
  });
}
function updateWorkingtionTemplate() {
  const workExpList = document.getElementById('workexpList');
  workExpList.innerHTML = ''; // Clear existing entries

  const workingSections = document.querySelectorAll('.workexpfield');
  let index = 1; // Initialize an index for each entry

  workingSections.forEach((field, fieldIndex) => {
    // Check if the current field is the last in a group of 4 (companyName, city, jobTitle, timePeriod)
    if (fieldIndex % 4 === 0) {
      const companyName = field.value;
      const city = workingSections[fieldIndex + 1].value;
      const jobTitle = workingSections[fieldIndex + 2].value;
      const timePeriod = workingSections[fieldIndex + 3].value;

      // Create a new work experience element
      const workingElement = document.createElement('div');
      workingElement.classList.add('collegename');
      workingElement.innerHTML = `
        <h4><b>${companyName}</b></h4>  
        <h6>${city}</h6>
        <div class="row">
          <div class="col-md-6">
            <p>${jobTitle}</p>
          </div>
          <div class="col-md">
            <p>${timePeriod}</p>
          </div>
        </div>
      `;

      // Append the work experience element to the work experience list
      workExpList.appendChild(workingElement);

      // Update the index for the next set of fields
      index++;
    }
  });
}


let educationCounter = 1; // Initialize the counter for educational entries

function addEducation() {
  educationCounter++; // Increment the counter for each new entry

  // Clone the educational information fields
  const educationClone = document.getElementById('idforaddingedu').cloneNode(true);

  // Update the header to indicate the education number
  const educationHeader = educationClone.querySelector('h5');
  educationHeader.textContent = `(Education #${educationCounter})`;

  // Generate unique IDs for the cloned input fields
  educationClone.querySelectorAll('.eduField').forEach((input) => {
    const fieldName = input.getAttribute('data-field');
    const uniqueId = `${fieldName}${educationCounter}`;
    input.id = uniqueId;
    input.value = ''; // Clear the input field
  });

  // Append the cloned section to the form
  document.getElementById('idforaddingedu').parentNode.insertBefore(educationClone, document.getElementById('addeducationfield'));

  // Update the education template immediately after cloning
  updateEducationTemplate();
}


// this java script is for Adding Work field

let workexpCounter = 1;

function addWorkexp() {
  workexpCounter++;

  const WorkingClone = document.getElementById('idforaddingwork').cloneNode(true);

  WorkingClone.querySelector('h5').textContent = `(Work Experience #${workexpCounter})`;

  WorkingClone.querySelectorAll('input').forEach((input) => {
    const fieldName = input.getAttribute('data-field');
    const uniqueId = `${fieldName}${workexpCounter}`;
    input.id = uniqueId;
    input.value = ''; // Clear the input field
  });

  document.getElementById('idforaddingwork').parentNode.insertBefore(WorkingClone, document.getElementById('addWorkfield'));

  updateWorkingtionTemplate();
}

    // this java script is for Adding Skills field

    function addskills(){
      const SkillsClone =document.getElementById('idforaddingskills').cloneNode(true);
      SkillsClone.querySelectorAll('input').forEach((input)=>{
        input.value='';
      });
      document.getElementById('idforaddingskills').parentNode.insertBefore(SkillsClone,document.getElementById('addskillsfield'));
    }




  //   function addachievementField() {
  //     let newNode=document.createElement("textarea");
  //     newNode.classList.add("form-control");
  //     newNode.classList.add("achievementField");
  //     newNode.classList.add("mt-2");
  //     newNode.setAttribute("rows",2);
  
  //    let eqOb=document.getElementById("achievement");
  //    let eqaddachievementbuttonOb=document.getElementById("addachievementbutton");
  
  //    eqOb.insertBefore(newNode, eqaddachievementbuttonOb);
  // }
  function addAchievementField() {
    // Create a new textarea element
    let newAchievementField = document.createElement("textarea");
    newAchievementField.className = "form-control achievementField mt-2";
    newAchievementField.rows = "2";
    newAchievementField.addEventListener("input", updateTemplate);
  
    // Add the new achievement field to the container
    let achievementContainer = document.getElementById("achievement");
    achievementContainer.appendChild(newAchievementField);

    let eqaddachievementbuttonOb=document.getElementById("addachievementbutton");

    achievementContainer.insertBefore(newAchievementField, eqaddachievementbuttonOb);
  }

    // this section for adding skills
  let skills = []; // Array to store skills

// Function to add a skill
function addSkill() {
  const skillName = document.getElementById('nameFieldSkill').value;
  const skillLevel = document.getElementById('skillLevelField').value;

  if (skillName.trim() !== '') {
    // Create a new skill object
    const skill = {
      name: skillName,
      level: skillLevel
    }; 

    // Add the skill to the skills array
    skills.push(skill);

    // Clear the input fields
    document.getElementById('nameFieldSkill').value = '';
    document.getElementById('skillLevelField').value = 1;

    // Display the skills on the template
    displaySkills();
  }
}


function displaySkills() {
  const skillsList = document.getElementById('skillsList');
  skillsList.innerHTML = ''; // Clear previous content

  // Loop through the skills array and create HTML elements
  skills.forEach((skill, index) => {
    const skillElement = document.createElement('div');
    skillElement.classList.add('mt-2');
    skillElement.innerHTML = `
      <div class="row">
        <div class="col-md-8">
          <p><strong>${skill.name}</strong></p>
        </div>
        <div class="col-md-4">
          <p>${'&#9733;'.repeat(skill.level)}</p>
        </div>
      </div>
    `;

    // Append the skill element to the skills list
    skillsList.appendChild(skillElement);
  });
}









    function updateTemplate() {
// Personal Information
document.getElementById('nameT').textContent = document.getElementById('nameField').value;
document.getElementById('designationT').textContent = document.getElementById('designationField').value;
document.getElementById('objectiveT').textContent = document.getElementById('AboutyouField').value;
document.getElementById('emailT').textContent = document.getElementById('emailField').value;
document.getElementById('contactT').textContent = document.getElementById('contactField').value;
document.getElementById('gitT').textContent = document.getElementById('gitField').value;
document.getElementById('linkT').textContent = document.getElementById('linkdinField').value;

// Update other sections (Achievements, Skills, Work Experience) in a similar way


   //Achievements
 
  let achievementFields = document.querySelectorAll(".achievementField");
  let str1 = "";

  achievementFields.forEach(function (field) {
    if (field.value.trim() !== "") {
      str1 += `<li>${field.value}</li>`;
    }
  });

  document.getElementById("achievementT").innerHTML = str1;




let file = document.getElementById('imgField').files[0];

let reader=new FileReader()

reader.readAsDataURL(file);

reader.onloadend=function (){
document.getElementById("imgT").src =reader.result;
}





}

// Listen for changes in form fields and update the template
document.getElementById('nameField').addEventListener('input', updateTemplate);
document.getElementById('designationField').addEventListener('input', updateTemplate);
document.getElementById('AboutyouField').addEventListener('input', updateTemplate);
document.getElementById('emailField').addEventListener('input', updateTemplate);
document.getElementById('contactField').addEventListener('input', updateTemplate);
document.getElementById('gitField').addEventListener('input', updateTemplate);
document.getElementById('linkdinField').addEventListener('input', updateTemplate);

document.getElementById('imgField').addEventListener('input', updateTemplate);

let achievementFields = document.querySelectorAll(".achievementField");
achievementFields.forEach(function (field) {
  field.addEventListener('input', updateTemplate);
});


document.getElementById('instituteName2').addEventListener('input', updateEducationTemplate);
document.getElementById('degree2').addEventListener('input', updateEducationTemplate);
document.getElementById('timePeriod2').addEventListener('input', updateEducationTemplate);
document.getElementById('cgpa2').addEventListener('input', updateEducationTemplate);
// Listen for changes in educational form fields and update the template
document.getElementById('companyName2').addEventListener('input', updateWorkingtionTemplate);
document.getElementById('city2').addEventListener('input', updateWorkingtionTemplate);
document.getElementById('jobTitle2').addEventListener('input', updateWorkingtionTemplate);
document.getElementById('timeperiod2').addEventListener('input', updateWorkingtionTemplate);




// JavaScript for your resumebuilder.js file
function previewCV() {
  // Hide the form section
  document.querySelector('#cv-form').style.display = 'none';

  // Change the cv-template class to col-md-12
  document.querySelector('#container').classList.remove('container');
  // document.querySelector('#container').classList.add('" "');

  document.querySelector('#row').classList.remove('row');
  // document.querySelector('#row').classList.add('" "');

  document.querySelector('#cv-template').classList.remove('col-md-6');
  // document.querySelector('#cv-template').classList.add('" "');
}



