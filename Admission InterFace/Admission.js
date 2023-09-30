const outgoingAdmissionMessages = [];
const ChatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".onlysendbutton");
const ChatBox = document.querySelector(".chatbox");
let userMessage;
let userName;
let currentQuestionIndex = 0;
const emailidpattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const customQuestions = [
    "Please enter your full name.",
    "Provide Your Mobile Number",
    "Enter Your Email ID",
    "Date of Your birth (dd/mm/yyyy)",
    "What is the Name of your Institute?",
    "Which Cource/Degree You have Done?",
    "Upload your 10th class Marksheet ",
    "How Much Marks You Score in class 10th(in Percent %) ",
    "Upload your 12th class Marksheet ",
    "How Much Marks You Score in class 12th(in Percent %) ",
    "You Are Intrested in Which Cource?",
];


const DataScienceQuestions = [

    "Why do you want to join the Data Science course ? ",
    "How you Know About Our Data Science Cource ?",
    "How sure are you about learning Data Science ? ",
    "How did you get to know about Edureify ? ",
    "When you Join This Cource ?",

    // Add more "Yes" questions here
];

const fullstackQuestions = [
    "Why do you want to join the FullStack Devloper course ? ",
    "How you Know About Our FullStack Devloper Cource ?",
    "How sure are you about learning FullStack Devloper? ",
    "How did you get to know about Edureify? ",
    "When you Join This Cource?",
    // Add more "No" questions here
];

const CreateCharLi = (message, className, gesture = "") => {
    const chatli = document.createElement("li");
    chatli.classList.add("chat", className);
    let chatContent =
        className === "outgoing"
            ? ` <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.8 61.8" id="avatar"><g data-name="Layer 2"><g data-name="—ÎÓÈ 1"><circle cx="30.9" cy="30.9" r="30.9" fill="#ffc200"></circle><path fill="#677079" fill-rule="evenodd" d="M52.587 52.908a30.895 30.895 0 0 1-43.667-.291 9.206 9.206 0 0 1 4.037-4.832 19.799 19.799 0 0 1 4.075-2.322c-2.198-7.553 3.777-11.266 6.063-12.335 0 3.487 3.265 1.173 7.317 1.217 3.336.037 9.933 3.395 9.933-1.035 3.67 1.086 7.67 8.08 4.917 12.377a17.604 17.604 0 0 1 3.181 2.002 10.192 10.192 0 0 1 4.144 5.22z"></path><path fill="#f9dca4" fill-rule="evenodd" d="m24.032 38.68 14.92.09v3.437l-.007.053a2.784 2.784 0 0 1-.07.462l-.05.341-.03.071c-.966 5.074-5.193 7.035-7.803 8.401-2.75-1.498-6.638-4.197-6.947-8.972l-.013-.059v-.2a8.897 8.897 0 0 1-.004-.207c0 .036.003.07.004.106z"></path><path fill-rule="evenodd" d="M38.953 38.617v4.005a7.167 7.167 0 0 1-.095 1.108 6.01 6.01 0 0 1-.38 1.321c-5.184 3.915-13.444.704-14.763-5.983z" opacity=".11"></path><path fill="#f9dca4" fill-rule="evenodd" d="M18.104 25.235c-4.94 1.27-.74 7.29 2.367 7.264a19.805 19.805 0 0 1-2.367-7.264zM43.837 25.235c4.94 1.27.74 7.29-2.368 7.263a19.8 19.8 0 0 0 2.368-7.263z"></path><path fill="#ffe8be" fill-rule="evenodd" d="M30.733 11.361c20.523 0 12.525 32.446 0 32.446-11.83 0-20.523-32.446 0-32.446z"></path><path fill="#8a5c42" fill-rule="evenodd" d="M21.047 22.105a1.738 1.738 0 0 1-.414 2.676c-1.45 1.193-1.503 5.353-1.503 5.353-.56-.556-.547-3.534-1.761-5.255s-2.032-13.763 4.757-18.142a4.266 4.266 0 0 0-.933 3.6s4.716-6.763 12.54-6.568a5.029 5.029 0 0 0-2.487 3.26s6.84-2.822 12.54.535a13.576 13.576 0 0 0-4.145 1.947c2.768.076 5.443.59 7.46 2.384a3.412 3.412 0 0 0-2.176 4.38c.856 3.503.936 6.762.107 8.514-.829 1.752-1.22.621-1.739 4.295a1.609 1.609 0 0 1-.77 1.214c-.02.266.382-3.756-.655-4.827-1.036-1.07-.385-2.385.029-3.163 2.89-5.427-5.765-7.886-10.496-7.88-4.103.005-14 1.87-10.354 7.677z"></path><path fill="#434955" fill-rule="evenodd" d="M19.79 49.162c.03.038 10.418 13.483 22.63-.2-1.475 4.052-7.837 7.27-11.476 7.26-6.95-.02-10.796-5.6-11.154-7.06z"></path><path fill="#e6e6e6" fill-rule="evenodd" d="M36.336 61.323c-.41.072-.822.135-1.237.192v-8.937a.576.576 0 0 1 .618-.516.576.576 0 0 1 .619.516v8.745zm-9.82.166q-.622-.089-1.237-.2v-8.711a.576.576 0 0 1 .618-.516.576.576 0 0 1 .62.516z"></path></g></g></svg></span> <p>${message}</p>`
            : `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="robot"><g><g><ellipse cx="24" cy="45.5" fill="#45413c" opacity=".15" rx="19.5" ry="1.5"></ellipse><path fill="#daedf7" d="M42 40.5c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4V27c0-9.9 8.1-18 18-18s18 8.1 18 18v13.5z"></path><path fill="#fff" d="M24 9C14.1 9 6 17.1 6 27v5c0-9.9 8.1-18 18-18s18 8.1 18 18v-5c0-9.9-8.1-18-18-18z"></path><path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M42 40.5c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4V27c0-9.9 8.1-18 18-18s18 8.1 18 18v13.5z"></path><path fill="#c0dceb" d="M30.5 44c0 1.1-.9 2-2 2h-9c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v8z"></path><path fill="#adc4d9" d="M17.5 38.5h13v2h-13z"></path><path fill="#adc4d9" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M45.5 36.5l-3.5 2V26l3.5 2zM2.5 36.5l3.5 2V26l-3.5 2z"></path><path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M24 9c.2-1 2.5-8 10.5-6.7"></path><circle cx="36" cy="3.5" r="2.5" fill="#ff6242" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle><path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M30.5 44c0 1.1-.9 2-2 2h-9c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v8z"></path><path fill="#ff6242" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M30.5 38.5h-13V36c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v2.5z"></path><path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M33.5 11.8C30.7 10.1 27.5 9 24 9s-6.7 1-9.5 2.7V24h19V11.8z"></path><circle cx="32.5" cy="25" r="5" fill="#00dfeb" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle><circle cx="32.5" cy="25" r="2" fill="#627b8c" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle><circle cx="15.5" cy="25" r="5" fill="#00dfeb" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle><circle cx="15.5" cy="25" r="2" fill="#627b8c" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle></g></g></svg></span><p>${message} ${gesture} </p>`;

    chatli.innerHTML = chatContent;
    return chatli;
};

var count = 0;
const dataScienceLink =
    "https://code.edureify.com/#bootcamp-course-schedule";

const handleAdmissionchat = () => {
    const outgoingarr = [
        "Name",
        "PhoneNumber",
        "emailId",
        "DOB",
        "Institute Name",
        "Course Name",
    ];

    userMessage = ChatInput.value.trim();

    if (!userMessage) return;

    // Add the user's outgoing message to the chat
    ChatBox.appendChild(CreateCharLi(userMessage, "outgoing"));

    if (count < outgoingarr.length) {
        // Store the outgoing message in the outgoingAdmissionMessages array
        outgoingAdmissionMessages.push({
            type: outgoingarr[count],
            message: userMessage,
        });
        count++;
    }

    if (count === 1) {
        // Store the user's name when answering the first question
        userName = userMessage.split(" ")[0];
        // Modify the second question to display the user's name
        customQuestions[1] = `${userName}! Please Provide Your Mobile Number`;
        customQuestions[2] = `Okay ${userName}! Now Enter Your Email ID`;
    }

    ChatInput.value = "";

    setTimeout(() => {
        if (currentQuestionIndex < customQuestions.length) {
            // Add the chatbot's incoming message with the next question and gesture
            const nextQuestion = customQuestions[currentQuestionIndex];
            // const gesture = gestures[currentQuestionIndex];
            
            
            if (currentQuestionIndex === 3) {
                if (!emailidpattern.test(userMessage)) {
                    ChatBox.appendChild(CreateCharLi("Please Enter a Valid Email ID !! 🚫", "incoming"));
                    ChatBox.scrollTop = ChatBox.scrollHeight;
                    return;
                }
            }
            ChatBox.appendChild(CreateCharLi(nextQuestion, "incoming"));

            if (currentQuestionIndex === 6) {
                const attachmentfield10 = document.createElement("div");
                attachmentfield10.innerHTML = `<p>Click here to Attach your document:</p>
<input
type="file"
id="attachment-input"
style="display: none"
accept="application/pdf, image/*"
/>
<label for="attachment-input" style="cursor: pointer">
<span
  class="material-symbols-outlined"
  style="
    font-size: 1.7rem;
    color: #000;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 4px;
  "
  >attach_file</span
>
</label>`;

                attachmentfield10.classList.add("chat", "incoming");
                ChatBox.appendChild(attachmentfield10);
                fileInput = attachmentfield10.querySelector("input[type=file]");
                fileInput.addEventListener("change", () =>
                    handleFileAttachment(fileInput)
                );
            }

            if (currentQuestionIndex === 8) {
                const attachmentfield12 = document.createElement("div");
                attachmentfield12.innerHTML = `<p>Click here to Attach your document:</p>
<input
type="file"
id="attachments-inputs"
style="display: none"
accept="application/pdf, image/*"
/>
<label for="attachments-inputs" style="cursor: pointer">
<span
  class="material-symbols-outlined"
  style="
    font-size: 1.7rem;
    color: #000;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 4px;
  "
  >attach_file</span
>
</label>`;

                attachmentfield12.classList.add("chat", "incoming");
                ChatBox.appendChild(attachmentfield12);
                fileInput = attachmentfield12.querySelector("input[type=file]");
                fileInput.addEventListener("change", () =>
                    handleFileAttachment12(fileInput)
                );
            }

            if (currentQuestionIndex === 10) {
                // Display "Yes" and "No" options for the 6th question
                const datasfullstabutton = document.createElement("div");
                datasfullstabutton.classList.add("yes-no-buttons");
                const datascience = document.createElement("button");
                datascience.innerText = "Data Science";
                datascience.classList.add("captureStyle");
                const fullstackdev = document.createElement("button");
                fullstackdev.classList.add("captureStyle");
                fullstackdev.innerText = "Full Stack Devlopement";

                // Event listener for "Yes" button
                datascience.addEventListener("click", () => {
                    flag = 0;
                    ChatBox.appendChild(CreateCharLi("Data Science", "outgoing"));
                    ChatBox.appendChild(
                        CreateCharLi("✅ Live Online Classes", "incoming")
                    );
                    ChatBox.appendChild(
                        CreateCharLi("✅Build in-demand tech skills and accelerate your career with most aspirational tech jobs", "incoming")
                    );
                    ChatBox.appendChild(
                        CreateCharLi("✅ With Professional certificate", "incoming")
                    );
                    ChatBox.appendChild(
                        CreateCharLi("✅ Only EMI from ₹6,378*", "incoming")
                    );
                    outgoingAdmissionMessages.push({
                        type: "Intrested",
                        message: "DataScience",
                    });

                    // Display questions from the "yesQuestions" array
                    displayCourseQuestion(DataScienceQuestions);
                });

                fullstackdev.addEventListener("click", () => {
                    flag = 1;
                    ChatBox.appendChild(
                        CreateCharLi("Full Stack Devlopment", "outgoing")
                    );
                    ChatBox.appendChild(
                        CreateCharLi("✅ Land High Paying Job just in 7 Month As a SDE", "incoming")
                    );
                    ChatBox.appendChild(
                        CreateCharLi("✅Backend Developer", "incoming")
                    );
                    ChatBox.appendChild(
                        CreateCharLi("✅Front End Developer and Full Stack Developer", "incoming")
                    );
                    
                    ChatBox.appendChild(
                        CreateCharLi("✅ Only EMI from ₹6,378*", "incoming")
                    );
                    outgoingAdmissionMessages.push({
                        type: "Intrested",
                        message: "Full Stack Devlopment",
                    });

                    // Display questions from the "noQuestions" array
                    displayCourseQuestion(fullstackQuestions);
                });

                datasfullstabutton.appendChild(datascience);
                datasfullstabutton.appendChild(fullstackdev);
                ChatBox.appendChild(datasfullstabutton);
            }
            ChatBox.scrollTop = ChatBox.scrollHeight;
            //   currentQuestionIndex++;
        }
        currentQuestionIndex++;
        ChatBox.scrollTop = ChatBox.scrollHeight;
    }, 700);
};
let forindexcount = 0;

const displayCourseQuestion = (questionArray) => {
    setTimeout(() => {
        if (forindexcount < questionArray.length) {
            const nextquestioncource = questionArray[forindexcount];
            ChatBox.appendChild(CreateCharLi(nextquestioncource, "incoming"));
            ChatBox.scrollTop = ChatBox.scrollHeight;
            forindexcount++;
        } else {
            displayNextMaincourcequestion();
        }
    }, 700);
};

const displayNextcourcequestion = (questionArray) => {
    userMessage = ChatInput.value.trim();

    ChatBox.appendChild(CreateCharLi(userMessage, "outgoing"));

    ChatInput.value = "";
    setTimeout(() => {
        if (forindexcount < questionArray.length) {
            const nextquestioncource = questionArray[forindexcount];
            ChatBox.appendChild(CreateCharLi(nextquestioncource, "incoming"));
            ChatBox.scrollTop = ChatBox.scrollHeight;
            forindexcount++;
        } else {
            displayNextMaincourcequestion();
        }
    }, 700);
};

const displayNextMaincourcequestion = () => {
    setTimeout(() => {
        if (currentQuestionIndex < customQuestions.length) {
            const nextQuestion = customQuestions[currentQuestionIndex];
            ChatBox.appendChild(CreateCharli(nextQuestion, "incoming"));
            currentQuestionIndex++;

            ChatBox.scrollTop = ChatBox.scrollHeight;
        } else {
            // If all questions are answered, the chatbot can provide a closing message
            ChatBox.appendChild(
                CreateCharLi(
                    "Thank you for completing the The application. We will contact You soon",
                    "incoming",
                    "✅"
                )
            );

            const linkMessage =
                "For more information, visit our course schedule: " +
                `<a href="${dataScienceLink}" target="_blank">Click Me</a>`;
            const linkContainer = CreateCharLi(linkMessage, "incoming");
            linkContainer.querySelector("a").style.color = "#007BFF"; // Change link color
            ChatBox.appendChild(linkContainer);

            ChatBox.scrollTop = ChatBox.scrollHeight;
            sendChatBtn.disabled = true; // Disable the send button to prevent further input

            // Convert outgoingMessages to JSON and log it
            const outgoingAdmissionMessagesJSON = JSON.stringify(
                outgoingAdmissionMessages
            );
            console.log(outgoingAdmissionMessagesJSON);
        }
    }, 700);
};

const handleFileAttachment = () => {
    const files = fileInput.files[0];
    if (files) {
        // Save the file(s) and their details
        const fileName = files.name;
        userMessage = `Uploaded File: ${fileName}`;
        ChatBox.appendChild(CreateCharLi(userMessage, "outgoing"));

        const fileType = fileName.split(".").pop();
        outgoingAdmissionMessages.push({
            type: "10th Marksheet",
            fileName: fileName,
            fileType: fileType,
        });

        setTimeout(() => {
            if (currentQuestionIndex < customQuestions.length) {
                const nextQuestion = customQuestions[currentQuestionIndex];
                ChatBox.appendChild(CreateCharLi(nextQuestion, "incoming"));
                currentQuestionIndex++;

                // Disable the file input after uploading
                fileInput.disabled = true;

                ChatBox.scrollTop = ChatBox.scrollHeight;
            }
        }, 600);
    }
};



const handleFileAttachment12 = () => {
    const files = fileInput.files[0];
    if (files) {
        // Save the file(s) and their details
        const fileName = files.name;
        userMessage = `Uploaded File: ${fileName}`;
        ChatBox.appendChild(CreateCharLi(userMessage, "outgoing"));

        const fileType = fileName.split(".").pop();
        outgoingAdmissionMessages.push({
            type: "12th Marksheet",
            fileName: fileName,
            fileType: fileType,
        });

        setTimeout(() => {
            if (currentQuestionIndex < customQuestions.length) {
                const nextQuestion = customQuestions[currentQuestionIndex];
                ChatBox.appendChild(CreateCharLi(nextQuestion, "incoming"));
                currentQuestionIndex++;

                // Disable the file input after uploading
                fileInput.disabled = true;

                ChatBox.scrollTop = ChatBox.scrollHeight;
            }
        }, 600);
    }
};

ChatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (currentQuestionIndex === 11) {
            if (flag == 1) {
                event.preventDefault();
                displayNextcourcequestion(fullstackQuestions);
            } else {
                event.preventDefault();
                displayNextcourcequestion(DataScienceQuestions);
            }
        } else {
            event.preventDefault();
            handleAdmissionchat();
        }
    }
});
// sendChatBtn.addEventListener("click", handleAdmissionchat);



sendChatBtn.addEventListener("click", () => {
if (currentQuestionIndex === 11) {
if (flag === 1) {
displayNextcourcequestion(fullstackQuestions);
} else {
displayNextcourcequestion(DataScienceQuestions);
}
} else {
handleAdmissionchat();
}
});

window.onload = () => {
    setTimeout(() => {
        const initialQuestion = customQuestions[0];
        ChatBox.appendChild(CreateCharLi(initialQuestion, "incoming"));
        currentQuestionIndex++;
    }, 800);
};