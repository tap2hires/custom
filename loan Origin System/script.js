const outgoingMessages = [];
const ChatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".onlysendbutton");
const ChatBox = document.querySelector(".chatbox");
let userMessage;
let currentQuestionIndex = 0;
let fileInput;
let capturedImage = null;
let cropper = null;
const cameraIcon = document.getElementById("camera-icon");
let webcamStream;
let capturedImageData = null; // To store the captured image

let flag = 0;

// Define an array of custom questions for the loan application
const customQuestions = [
  "Welcome, Please enter your full name.",
  "Great! Can you provide your contact Number?",
  "Thanks for providing please Share your Aadhar Number",
  "Thank you for the information. Now Upload Your PanCard",
  "Got it. please Upload Your Current Image click the camera icon to take Picture",
  "Thank you for The Image. Now Enter your Address",
];

const gestures = ["👍", "📞", "🆔", "💳", "📷", "✅"];

customQuestions.push("What is your current employment status?");
customQuestions.push("Please provide your monthly income.");
customQuestions.push("Do you own a house or property? (Yes/No)");
// customQuestions.push("Now tell me about your family");
// customQuestions.push("Great buddy!! give a highfive and tell me more ");


const yesQuestions = [
  "Please provide additional details about your property.",
  "What is the estimated value of your property?",
  "Please provide additional details about your property.",
  "What is the estimated value of your property?",
  // Add more "Yes" questions here
];

const noQuestions = [
  "Would you like to rent a property instead?",
  "Would you like to rent a your house instead? ",
  "Would you like to rent a property instead?",

  // Add more "No" questions here
];


const CreateCharLi = (message, className, gesture = "") => {
  const chatli = document.createElement("li");
  chatli.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? ` <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.8 61.8" id="avatar"><g data-name="Layer 2"><g data-name="—ÎÓÈ 1"><circle cx="30.9" cy="30.9" r="30.9" fill="#58b0e0"></circle><path fill="#f9dca4" fill-rule="evenodd" d="m23.255 38.68 15.907.121v12.918l-15.907-.121V38.68z"></path><path fill="#e6e6e6" fill-rule="evenodd" d="M43.971 58.905a30.967 30.967 0 0 1-25.843.14V48.417H43.97z"></path><path fill="#e9573e" fill-rule="evenodd" d="M33.403 61.7q-1.238.099-2.503.1-.955 0-1.895-.057l1.03-8.988h2.41z"></path><path fill="#677079" fill-rule="evenodd" d="M25.657 61.332A34.072 34.072 0 0 1 15.9 57.92a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 5.212 1.711 13.482 2.405 18.95z"></path><path fill-rule="evenodd" d="M39.165 38.759v3.231c-4.732 5.527-13.773 4.745-15.8-3.412z" opacity=".11"></path><path fill="#ffe8be" fill-rule="evenodd" d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z"></path><path fill="#f9dca4" fill-rule="evenodd" d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z"></path><path fill="#464449" fill-rule="evenodd" d="M21.931 14.328c-3.334 3.458-2.161 13.03-2.161 13.03l-1.05-.495c-6.554-25.394 31.634-25.395 25.043 0l-1.05.495s1.174-9.572-2.16-13.03c-4.119 3.995-14.526 3.974-18.622 0z"></path><path fill="#677079" fill-rule="evenodd" d="M36.767 61.243a30.863 30.863 0 0 0 17.408-10.018l-1.09-2.631-13.924-6.212c0 5.212-1.7 13.393-2.394 18.861z"></path><path fill="#fff" fill-rule="evenodd" d="m39.162 41.98-7.926 6.465 6.573 5.913s1.752-9.704 1.353-12.378z"></path><path fill="#fff" fill-rule="evenodd" d="m23.253 41.98 7.989 6.465-6.645 5.913s-1.746-9.704-1.344-12.378z"></path><path fill="#e9573e" fill-rule="evenodd" d="m28.109 51.227 3.137-2.818 3.137 2.818-3.137 2.817-3.137-2.817z"></path><path fill="#434955" fill-rule="evenodd" d="M25.767 61.373a30.815 30.815 0 0 1-3.779-.88 2.652 2.652 0 0 1-.114-.093l-3.535-6.39 4.541-3.26h-4.752l1.017-6.851 4.11-2.599c.178 7.37 1.759 15.656 2.512 20.073zM36.645 61.266c.588-.098 1.17-.234 1.747-.384a56.83 56.83 0 0 0 2.034-.579l.134-.043 3.511-6.315-4.541-3.242h4.752l-1.017-6.817-4.11-2.586c-.178 7.332-1.758 15.571-2.51 19.966z"></path></g></g></svg></span> <p>${message}</p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message} ${gesture} </p>`;

  chatli.innerHTML = chatContent;
  return chatli;
};

var count = 0;


const handleChat = () => {
  const outgoingarr = [
    "Name",
    "PhoneNumber",
    "Aadharcard",
    "Address",
    "EmploymentStatus",
    "MonthlyIncome",
  ];

  userMessage = ChatInput.value.trim();

  if (!userMessage) return;

  // Add the user's outgoing message to the chat
  ChatBox.appendChild(CreateCharLi(userMessage, "outgoing"));

  if (count < outgoingarr.length) {
    // Store the outgoing message in the outgoingMessages array
    outgoingMessages.push({
      type: outgoingarr[count],
      message: userMessage,
    });
    count++;
  }

  // Clear the input field
  ChatInput.value = "";

  setTimeout(() => {
    if (currentQuestionIndex < customQuestions.length) {
      // Add the chatbot's incoming message with the next question and gesture
      const nextQuestion = customQuestions[currentQuestionIndex];
      const gesture = gestures[currentQuestionIndex];
      ChatBox.appendChild(CreateCharLi(nextQuestion, "incoming", gesture));
      currentQuestionIndex++;

      if (currentQuestionIndex === 4) {
        // Display the attachment field as an incoming message
        const attachmentField = document.createElement("div");
        attachmentField.innerHTML = `
      <p>Click here to upload your document:</p>
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
            background: #fff;
          "
          >attach_file</span
        >
      </label>
    `;
        attachmentField.classList.add("chat", "incoming");
        ChatBox.appendChild(attachmentField);
        fileInput = attachmentField.querySelector("input[type=file]");
        fileInput.addEventListener("change", () => handleFileUpload(fileInput));
      }
      if (currentQuestionIndex === 9) {
        // Display "Yes" and "No" options for the 9th question
        const yesNoButtons = document.createElement("div");
        yesNoButtons.classList.add("yes-no-buttons");
        const yesButton = document.createElement("button");
        yesButton.innerText = "Yes";
        yesButton.classList.add("captureStyle");
        const noButton = document.createElement("button");
        noButton.classList.add("captureStyle");
        noButton.innerText = "No";

        // Event listener for "Yes" button
        yesButton.addEventListener("click", () => {
          flag = 0;
          ChatBox.appendChild(CreateCharLi("Yes", "outgoing"));
          outgoingMessages.push({
            type: "PropertyOwnership",
            message: "Yes",
          });

          // Display questions from the "yesQuestions" array
          displayNextQuestion(yesQuestions);
          // console.log("hello");
        });

        noButton.addEventListener("click", () => {
          flag = 1;
          ChatBox.appendChild(CreateCharLi("No", "outgoing"));
          outgoingMessages.push({
            type: "PropertyOwnership",
            message: "No",
          });

          // Display questions from the "noQuestions" array
          displayNextQuestion(noQuestions);
        });

        yesNoButtons.appendChild(yesButton);
        yesNoButtons.appendChild(noButton);
        ChatBox.appendChild(yesNoButtons);
      }
      ChatBox.scrollTop = ChatBox.scrollHeight;


    }
  }, 600);
};

let forindexcount = 0


const displayNextQuestion = (questionArray) => {
  // Add the user's outgoing message to the chat
  userMessage = ChatInput.value.trim();

  ChatBox.appendChild(CreateCharLi(userMessage, "outgoing"));

  // Clear the input field
  ChatInput.value = "";
  setTimeout(() => {
    if (forindexcount < questionArray.length) {
      // Add the chatbot's incoming message with the next question and gesture
      const nextQuestion1 = questionArray[forindexcount];
      ChatBox.appendChild(CreateCharLi(nextQuestion1, "incoming"));
      ChatBox.scrollTop = ChatBox.scrollHeight;
      forindexcount++;
      console.log(forindexcount);
    } else {
      // If there are no more questions in the array, continue with the main questions
      displayNextMainQuestion();
    }
    
  }, 600);
};



const displayNextMainQuestion = () => {

  setTimeout(() => {
    if (currentQuestionIndex < customQuestions.length) {
      // Add the chatbot's incoming message with the next question and gesture
      const nextQuestion = customQuestions[currentQuestionIndex];
      const gesture = gestures[currentQuestionIndex];
      ChatBox.appendChild(CreateCharLi(nextQuestion, "incoming", gesture));
      currentQuestionIndex++;

      ChatBox.scrollTop = ChatBox.scrollHeight;
    }
    else {
      // If all questions are answered, the chatbot can provide a closing message
      ChatBox.appendChild(CreateCharLi("Thank you for completing the loan application.", "incoming", "✅"));
      sendChatBtn.disabled = true; // Disable the send button to prevent further input

      // Convert outgoingMessages to JSON and log it
      const outgoingMessagesJSON = JSON.stringify(outgoingMessages);
      console.log(outgoingMessagesJSON);
    }
  }, 600);
};




const handleFileUpload = (fileInput) => {
  // const capturedImages = [];
  const file = fileInput.files[0];
  if (file) {
    const fileName = file.name;
    userMessage = `Uploaded File: ${fileName}`;

    // Add the user's outgoing message (file name) to the chat
    ChatBox.appendChild(CreateCharLi(userMessage, "outgoing"));

    // Store file information in the outgoingMessages array
    const fileType = fileName.split(".").pop();
    outgoingMessages.push({
      type: "Document",
      fileName: fileName,
      fileType: fileType,
    });

    // Simulate sending the file to the chatbot and displaying the next question
    setTimeout(() => {
      if (currentQuestionIndex < customQuestions.length) {
        const nextQuestion = customQuestions[currentQuestionIndex];
        const gesture = gestures[currentQuestionIndex];
        ChatBox.appendChild(
          CreateCharLi(nextQuestion, "incoming", gesture)
        );
        currentQuestionIndex++;

        if (currentQuestionIndex === 5) {
          document.querySelector(".cameraicon").style.display = "block";
        }
        // Disable the file input after uploading
        fileInput.disabled = true;

        ChatBox.scrollTop = ChatBox.scrollHeight;
      }
    }, 600);
  }
};

// Function to open the webcam
// let isWebcamPaused = false;
let isWebcamPaused = false;
// let capturedImage = null;
// let cropper = null;

// Function to open the webcam
const videoElement = document.createElement("video");
videoElement.setAttribute("autoplay", "true");
videoElement.setAttribute("playsinline", "true");

const openWebcam = () => {
  if (window.innerWidth <= 768) {
    alert("Opening webcam on mobile...");
  } else {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        webcamStream = stream;
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  }
  // Access the user's webcam

  const captureButton = document.createElement("button");
  captureButton.innerText = "Click";
  captureButton.classList.add("captureStyle");
  captureButton.classList.add("capture-button");

  const closeButton = document.createElement("button");
  closeButton.innerText = "❌";
  closeButton.classList.add("capture-button");

  closeButton.addEventListener("click", () => {
    closeWebcam();
  });

  // Create "Confirm" and "Retake" buttons dynamically
  const confirmButton = document.createElement("button");
  confirmButton.innerText = "Confirm";
  confirmButton.classList.add("capture-button");
  confirmButton.classList.add("captureStyle");
  confirmButton.style.display = "none"; // Initially hide the Confirm button

  const retakeButton = document.createElement("button");
  retakeButton.innerText = "Retake";
  retakeButton.classList.add("capture-button");
  retakeButton.classList.add("captureStyle");
  retakeButton.style.display = "none"; // Initially hide the Retake button

  // Add the buttons to the webcam container
  const webcamContainer = document.querySelector(".webcam-container");
  webcamContainer.appendChild(videoElement); // Add the video element to the container
  webcamContainer.appendChild(captureButton);
  webcamContainer.appendChild(closeButton);
  webcamContainer.appendChild(confirmButton);
  webcamContainer.appendChild(retakeButton);

  // Event listener for the Confirm button
  confirmButton.addEventListener("click", () => {
    if (capturedImage) {
      if (cropper) {
        // Get the cropped image data URL
        const croppedImageDataURL = cropper
          .getCroppedCanvas()
          .toDataURL("image/png");
        // Store the image data URL in the outgoingMessages array
        outgoingMessages.push({
          type: "Image",
          data: croppedImageDataURL, // Store the image URL
        });

        //   console.log(outgoingMessages);

        // Send the cropped image to the chat as an outgoing message
        ChatBox.appendChild(
          CreateCharLi("Captured Image ✅", "outgoing")
        );
        const imageElement = document.createElement("img");
        imageElement.src = croppedImageDataURL;
        ChatBox.appendChild(imageElement);

        // Close the webcam
        closeWebcam();

        // Reset the buttons and captured image
        capturedImage = null;
        hideCaptureButtons(); // Hide Confirm and Retake buttons

        // Simulate displaying the next question
        setTimeout(() => {
          if (currentQuestionIndex < customQuestions.length) {
            const nextQuestion = customQuestions[currentQuestionIndex];
            const gesture = gestures[currentQuestionIndex];
            ChatBox.appendChild(
              CreateCharLi(nextQuestion, "incoming", gesture)
            );
            currentQuestionIndex++;

            ChatBox.scrollTop = ChatBox.scrollHeight;
          }
        }, 600);
      }
    }
  });

  // Event listener for the Retake button
  retakeButton.addEventListener("click", () => {
    // Remove the previously captured image and its associated elements
    //     const capturedImageElement = document.querySelector(".captured-image");
    //   if (capturedImageElement) {
    //     capturedImageElement.parentNode.removeChild(capturedImageElement);
    //   }
    const webcamContainer = document.querySelector(".webcam-container");
    const capturedImageElement = webcamContainer.querySelector("img");
    if (capturedImageElement) {
      capturedImageElement.remove();
    }

    // Remove the captured image data and Cropper instance
    capturedImage = null;
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }

    // Hide Confirm and Retake buttons, show the Capture button and webcam
    hideCaptureButtons();
    captureButton.style.display = "inline-block";
    videoElement.style.display = "block";

    // Resume the webcam
    if (isWebcamPaused) {
      resumeWebcam();
      isWebcamPaused = false;
    }
  });

  // Event listener for the Capture button
  captureButton.addEventListener("click", () => {
    captureButton.style.display = "none";
    closeButton.style.display = "none";
    if (!isWebcamPaused) {
      pauseWebcam(); // Pause the webcam before capturing
      isWebcamPaused = true;
    }

    // Add a delay to allow the frame to render
    captureImage(videoElement);
    // setTimeout(() => {
    // }); // You can adjust the delay time as needed
  });

  // Function to capture an image from the webcam
  const captureImage = (videoElement) => {
    // Create a canvas to capture the frame
    if (webcamStream) {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert the captured frame to a data URL (base64)
      capturedImage = canvas.toDataURL("image/png");

      // Hide the video element immediately
      videoElement.style.display = "none";

      // Initialize the Cropper.js instance for image cropping
      const imageElement = document.createElement("img");
      imageElement.src = capturedImage;

      // Insert the image element before the video element
      videoElement.parentNode.insertBefore(imageElement, videoElement);

      // Initialize Cropper.js for image cropping
      cropper = new Cropper(imageElement, {
        aspectRatio: 1, // You can set the aspect ratio as needed
        crop: () => {
          // Handle cropping changes here if needed
        },
      });

      showCaptureButtons(); // Show Confirm and Retake buttons
    }
  };

  const pauseWebcam = () => {
    if (webcamStream) {
      const tracks = webcamStream.getVideoTracks();
      if (tracks.length > 0) {
        // Pause the video track
        tracks[0].enabled = false;
        // videoElement.srcObject = null;
      }
    }
  };

  const resumeWebcam = () => {
    if (webcamStream) {
      const tracks = webcamStream.getVideoTracks();
      if (tracks.length > 0) {
        // Resume the video track
        tracks[0].enabled = true;
        videoElement.srcObject = webcamStream;
      }
    }
  };

  // Function to close the webcam
  const closeWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
    }
    videoElement.style.position = "static";
    videoElement.style.left = "auto";
    videoElement.style.top = "auto";

    // Remove Cropper.js instance
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }

    const webcamContainer = document.querySelector(".webcam-container");
    if (webcamContainer) {
      document.body.removeChild(webcamContainer);
    }
  };

  // Function to show the Confirm and Retake buttons
  const showCaptureButtons = () => {
    confirmButton.style.display = "inline-block";
    retakeButton.style.display = "inline-block";
  };

  // Function to hide the Confirm and Retake buttons
  const hideCaptureButtons = () => {
    confirmButton.style.display = "none";
    retakeButton.style.display = "none";
  };
};

// Add event listener to the camera icon to open the webcam
if (cameraIcon) {
  cameraIcon.addEventListener("click", openWebcam);
}

ChatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (currentQuestionIndex === 9) {
      if (flag === 1) { // Use triple equals for comparison
        event.preventDefault();
        displayNextQuestion(noQuestions);
      } else {

        event.preventDefault();
        displayNextQuestion(yesQuestions);
      }
    } else {
      event.preventDefault();
      handleChat();
    }
  }
});

sendChatBtn.addEventListener("click", handleChat);

if (customQuestions.length > 0) {
  const initialQuestion = customQuestions[0];
  ChatBox.appendChild(CreateCharLi(initialQuestion, "incoming"));
  currentQuestionIndex++;
}