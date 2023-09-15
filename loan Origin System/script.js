const outgoingMessages = [];
const ChatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".onlysendbutton");
const ChatBox = document.querySelector(".chatbox");

let userMessage;
let currentQuestionIndex = 0;
let fileInput;
const cameraIcon = document.getElementById("camera-icon");
let webcamStream;
let capturedImage = null; // To store the captured image

// Define an array of custom questions for the loan application
const customQuestions = [
    "Welcome, Please enter your full name.",
    "Great! Can you provide your contact Number?",
    "Thanks for providing please Share your Aadhar Number",
    "Thank you for the information. Now Upload Your PanCard",
    "Got it. please Upload Your Current Image click the camera icon to take",
    "Thank you for completing the application. We will review your information and get back to you soon.",
];

const gestures = ["👍", "📞", "🆔", "💰", "⏳", "✅"];

const CreateCharLi = (message, className, gesture = "") => {
    const chatli = document.createElement("li");
    chatli.classList.add("chat", className);
    let chatContent =
        className === "outgoing"
            ? `<p>${message}</p>`
            : `<span class="material-symbols-outlined">smart_toy</span><p>${gesture} ${message}</p>`;

    chatli.innerHTML = chatContent;
    return chatli;
};

var count = 0;

const handleChat = () => {
    userMessage = ChatInput.value.trim();

    if (!userMessage) return;

    // Add the user's outgoing message to the chat
    ChatBox.appendChild(CreateCharLi(userMessage, "outgoing"));

    if (count < 5) {
        const outgoingarr = ["Name", "PhoneNumber", "Aadharcard", "PanCard", "Image"];
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

            ChatBox.scrollTop = ChatBox.scrollHeight;
        } else {
            // If all questions are answered, the chatbot can provide a closing message
            ChatBox.appendChild(CreateCharLi("Thank you for completing the loan application.", "incoming", "✅"));
            sendChatBtn.disabled = true; // Disable the send button to prevent further input

            // Convert outgoingMessages to JSON and log it
            const outgoingMessagesJSON = JSON.stringify(outgoingMessages);
            console.log(outgoingMessagesJSON);
        }
    }, 600);
};

// Function to handle file uploads
const handleFileUpload = (fileInput) => {
    const file = fileInput.files[0];
    if (file) {
        const fileName = file.name;
        userMessage = `Uploaded File: ${fileName}`;

        // Add the user's outgoing message (file name) to the chat
        ChatBox.appendChild(CreateCharLi(userMessage, "outgoing"));

        // Store file information in the outgoingMessages array
        outgoingMessages.push({
            type: "Document",
            fileName: fileName,
        });

        // Simulate sending the file to the chatbot and displaying the next question
        setTimeout(() => {
            if (currentQuestionIndex < customQuestions.length) {
                const nextQuestion = customQuestions[currentQuestionIndex];
                const gesture = gestures[currentQuestionIndex];
                ChatBox.appendChild(CreateCharLi(nextQuestion, "incoming", gesture));
                currentQuestionIndex++;

                // Disable the file input after uploading
                fileInput.disabled = true;

                ChatBox.scrollTop = ChatBox.scrollHeight;
            }
        }, 600);
    }
};


// Function to open the webcam
let isWebcamPaused = false;

// Function to open the webcam
const openWebcam = () => {
    const videoElement = document.createElement("video");
    videoElement.setAttribute("autoplay", "true");
    videoElement.setAttribute("playsinline", "true");

    // Access the user's webcam
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            webcamStream = stream;
            videoElement.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error accessing webcam:", error);
        });

    const captureButton = document.createElement("button");
    captureButton.innerText = "Capture";
    captureButton.classList.add("capture-button");

    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.classList.add("capture-button");

    closeButton.addEventListener("click", () => {
        closeWebcam();
    });

    // Create "Confirm" and "Retake" buttons dynamically
    const confirmButton = document.createElement("button");
    confirmButton.innerText = "Confirm";
    confirmButton.classList.add("capture-button");
    confirmButton.style.display = "none"; // Initially hide the Confirm button

    const retakeButton = document.createElement("button");
    retakeButton.innerText = "Retake";
    retakeButton.classList.add("capture-button");
    retakeButton.style.display = "none"; // Initially hide the Retake button

    // Add the buttons to the webcam container
    const webcamContainer = document.querySelector(".webcam-container");
    webcamContainer.appendChild(videoElement);
    webcamContainer.appendChild(captureButton);
    webcamContainer.appendChild(closeButton);
    webcamContainer.appendChild(confirmButton);
    webcamContainer.appendChild(retakeButton);

    // Event listener for the Confirm button
    confirmButton.addEventListener("click", () => {
        if (capturedImage) {
            // Send the captured image to the chat as an outgoing message
            ChatBox.appendChild(CreateCharLi("Captured Image ✅", "outgoing"));
            const imageElement = document.createElement("img");
            imageElement.src = capturedImage;
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
                    ChatBox.appendChild(CreateCharLi(nextQuestion, "incoming", gesture));
                    currentQuestionIndex++;

                    ChatBox.scrollTop = ChatBox.scrollHeight;
                }
            }, 600);
        }
    });

    // Event listener for the Retake button
    retakeButton.addEventListener("click", () => {
        // Hide Confirm and Retake buttons, remove the captured image
        capturedImage = null;
        hideCaptureButtons(); // Hide Confirm and Retake buttons
        captureButton.style.display = "inline-block";

        if (isWebcamPaused) {
            resumeWebcam(); // Resume the webcam when retaking
            isWebcamPaused = false;
        }

        videoElement.srcObject = webcamStream;

        // Remove the captured image from the chatbox
        const chatbox = document.querySelector(".chatbox");
        const chatboxChildren = chatbox.querySelectorAll("li");
        if (chatboxChildren.length > 0) {
            // Remove the last two items (image and "Captured Image" message)
            chatbox.removeChild(chatboxChildren[chatboxChildren.length - 1]);
        }
    });

    // Event listener for the Capture button
    captureButton.addEventListener("click", () => {
        if (!isWebcamPaused) {
            pauseWebcam(); // Pause the webcam before capturing
            isWebcamPaused = true;
        }
        captureImage(videoElement);

        showCaptureButtons(); // Show Confirm and Retake buttons
    });

    // Function to capture an image from the webcam
    const captureImage = (videoElement) => {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Convert the captured frame to a data URL (base64)
        capturedImage = canvas.toDataURL("image/png");

        

        // Hide the Capture button after capturing
        captureButton.style.display = "none";
        showCaptureButtons(); // Show Confirm and Retake buttons
    };

    const pauseWebcam = () => {
        if (webcamStream) {
            const tracks = webcamStream.getVideoTracks();
            if (tracks.length > 0) {
                // Pause the video track
                tracks[0].enabled = false;
            }
        }
    };

    const resumeWebcam = () => {
        if (webcamStream) {
            const tracks = webcamStream.getVideoTracks();
            if (tracks.length > 0) {
                // Resume the video track
                tracks[0].enabled = true;
            }
        }
    };

    // Function to close the webcam
    const closeWebcam = () => {
        if (webcamStream) {
            webcamStream.getTracks().forEach((track) => track.stop());
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
        event.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

if (customQuestions.length > 0) {
    const initialQuestion = customQuestions[0];
    ChatBox.appendChild(CreateCharLi(initialQuestion, "incoming"));
    currentQuestionIndex++;
}

