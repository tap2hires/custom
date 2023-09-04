
const accordion = document.getElementsByClassName("contentBx");
const exploreButton = document.querySelector(".ExploreAllFeaturesButton234");

exploreButton.addEventListener("click", function () {
  // Toggle visibility of additional questions
  for (let i = 2; i < accordion.length; i++) {
    accordion[i].classList.toggle("hidden");
  }
});

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      // Close any open FAQ question
      for (let j = 0; j < accordion.length; j++) {
        accordion[j].classList.remove("active");
      }
      // Open the clicked FAQ question
      this.classList.add("active");
    } else {
      // Close the clicked FAQ question
      this.classList.remove("active");
    }
  });
}

function beginner(divNum){
  for(var i=1;i<=6;i++){
    var durationdetaildiv = document.getElementById('durationdetaildiv'+ i);
  

    if(i===divNum){
      durationdetaildiv.style.display='block';


    }else{
      durationdetaildiv.style.display='none';
      
      
    }
  }
}























function toggleDiv(divNum) {
  for (var i = 1; i <= 3; i++) {
    var div = document.getElementById('div' + i);
    if (i === divNum) {
      div.style.display = 'block';
    } else {
      div.style.display = 'none';
    }
  }
}
window.onload = function() {
  toggleDiv(1); // Default to Button 1
};

const accordion1 = document.getElementsByClassName("courseboxes");

for (let i = 0; i < accordion1.length; i++) {
  accordion1[i].addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      // Close any open FAQ question
      for (let j = 0; j < accordion1.length; j++) {
        accordion1[j].classList.remove("active");
      }
      // Open the clicked FAQ question
      this.classList.add("active");
    } else {
      // Close the clicked FAQ question
      this.classList.remove("active");
    }
  });
}






function beginner(divNum){
  for(var i=1;i<=6;i++){
    var durationdetaildiv = document.getElementById('durationdetaildiv'+ i);
  

    if(i===divNum){
      durationdetaildiv.style.display='block';


    }else{
      durationdetaildiv.style.display='none';
      
      
    }
  }
}




const radios = document.querySelectorAll('input[type="radio"]');
const divContainers = document.querySelectorAll('.buttonsof');

// Activate the first radio button on window load
radios[0].checked = true;
divContainers[0].classList.add('active');

divContainers.forEach((div, index) => {
    div.addEventListener('click', () => {
        radios.forEach((radio) => {
            radio.checked = false;
        });
        radios[index].checked = true;
    });
});

radios.forEach((radio, index) => {
    radio.addEventListener('click', () => {
        divContainers.forEach((div) => {
            div.classList.remove('active');
        });
        divContainers[index].classList.add('active');
    });
});



const divs = document.querySelectorAll('.buttonsof');
let selectedDiv = null;

function selectDiv(div) {
const randomColor = '#6A7AFF';
div.style.backgroundColor = randomColor;
div.style.color = '#fff';

if (selectedDiv !== null && selectedDiv !== div) {
  selectedDiv.style.backgroundColor = 'white';
  selectedDiv.style.color = 'black';
}

selectedDiv = div;
}

window.addEventListener('load', () => {
if (divs.length > 0) {
  selectDiv(divs[0]);
}
});

divs.forEach((div) => {
div.addEventListener('click', () => {
  selectDiv(div);
});
});




const modules = document.querySelectorAll('.individualmodule');
let selectedModule = null;

// Function to select a module
function selectModule(div) {
const colorOfSelect = '#3946B4';
div.style.backgroundColor = colorOfSelect;
div.style.color = '#fff';

if (selectedModule !== null && selectedModule !== div) {
  selectedModule.style.backgroundColor = 'white';
  selectedModule.style.color = 'black';
}

selectedModule = div;
}

// Select the first module on window load
window.addEventListener('load', () => {
if (modules.length > 0) {
  selectModule(modules[0]);
}
});

// Add click event listeners to all modules
modules.forEach((div) => {
div.addEventListener('click', () => {
  selectModule(div);
});
});
