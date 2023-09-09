// Sample user data (replace with server-side database)
const users = {
    "user1": { password: "pass1", tasks: [] },
    "user2": { password: "pass2", tasks: [] }
};

const messages = [];

const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");
const userProfile = document.getElementById("user-profile");
const taskAssignmentForm = document.getElementById("task-assignment-form");
const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

let currentUser = null;

// Event listeners
registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!users[username]) {
        users[username] = { password: password, tasks: [] };
        alert("Registration successful. Please login.");
        loginForm.reset();
    } else {
        alert("Username already exists. Please choose another.");
    }
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    if (users[username] && users[username].password === password) {
        currentUser = username;
        updateProfile();
    } else {
        alert("Invalid username or password. Please try again.");
    }
});

taskAssignmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = document.getElementById("task-name").value;
    const description = document.getElementById("task-description").value;
    const assignedTo = document.getElementById("assigned-to").value;
    if (users[assignedTo]) {
        const task = { taskName, description, assignedTo };
        users[assignedTo].tasks.push(task);
        alert(`Task '${taskName}' assigned to ${assignedTo}`);
        taskAssignmentForm.reset();
    } else {
        alert("User not found. Task assignment failed.");
    }
});

sendButton.addEventListener("click", () => {
    const messageText = messageInput.value;
    if (messageText) {
        const message = { user: currentUser, text: messageText };
        messages.push(message);
        displayMessages();
        messageInput.value = "";
    }
});

// Update user profile
function updateProfile() {
    userProfile.style.display = "block";
    document.getElementById("profile-username").textContent = currentUser;
    const userTasks = users[currentUser].tasks.map(task => task.taskName);
    document.getElementById("profile-tasks").textContent = userTasks.join(", ");
    displayMessages();
}

// Display chat messages
function displayMessages() {
    chatMessages.innerHTML = "";
    messages.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.textContent = `${message.user}: ${message.text}`;
        chatMessages.appendChild(messageElement);
    });
}
