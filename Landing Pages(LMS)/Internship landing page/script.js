
const data=[
    {
        title: "Artificial Inteligence",
        image: "Internshipimages/Machine-Learning 1ArtificialIntelligence.svg"
    },
    {
        title: "Data Science",
        image:"Internshipimages/Machine-Learning 1DataScience.svg"
    },
    {
        title: "Deep Learning",
        image: "Internshipimages/Machine-Learning 1DeepLearning.svg"
    },
    {
        title: "Machine Learning",
        image:"Internshipimages/Machine-Learning 1Machinelearning.svg",
    },
    {
        title: "Python Program",
        image:"Internshipimages/Machine-Learning 1pythonprogram.svg"
    },
    {
        title: "Python FullStack",
        image:"Internshipimages/Machine-Learning 1pythonfullstack.svg"
    },
    {
        title: "Java Programming",
        image: "Internshipimages/Machine-Learning 1javaprogram.svg"
    },
    {
        title: "Java Fullstack",
        image:"Internshipimages/Machine-Learning 1javafullstack.svg"
    },
    {
        title: "React Js App Devlopment",
        image:"Internshipimages/Machine-Learning 1reactJs.svg"
    },
    {
        title: "Full Stack Web Devlopment",
        image:"Internshipimages/Machine-Learning 1FullStackwebDevloment.svg"
    },
    {
        title: "Computer Vision Open CV <br>(Python)",
        image:"Internshipimages/Machine-Learning 1Computervision.svg"
    },
    {
        title: "Image Processing",
        image: "Internshipimages/Machine-Learning 1imageprocessing.svg"
    },
    {
        title: "Embedded System",
        image:"Internshipimages/Machine-Learning 1javafullstack.svg"
    },
    {
        title: "Embeeded C",
        image:"Internshipimages/Machine-Learning 1reactJs.svg"
    },
    {
        title: "ARM Cortex STM 32",
        image:"Internshipimages/Machine-Learning 1FullStackwebDevloment.svg"
    },
    {
        title: "Internet of Things",
        image:"Internshipimages/Machine-Learning 1pythonfullstack.svg"
    },
    {
        title: "Matlab Simulink",
        image: "Internshipimages/Machine-Learning 1javaprogram.svg"
    },
    {
        title: "Renewable Energy",
        image:"Internshipimages/Machine-Learning 1javafullstack.svg"
    },
    {
        title: "EV Design",
        image:"Internshipimages/Machine-Learning 1reactJs.svg"
    },
    {
        title: "PCB Design",
        image:"Internshipimages/Machine-Learning 1FullStackwebDevloment.svg"
    }
];


data.forEach((element,i) => {
    
const main=document.querySelector(".cardSection")
console.log(main);

//create card

const card = document.createElement('div');
card.cardlist = 'card';

const  courcecard = `
                <img src="${data[i].image}" class="cardimg" alt="1">
                <div class="cardbody">
                  <p class="cardtext">${data[i].title}</p>
                </div>


`;

card.innerHTML+=courcecard;
main.appendChild(card);
});