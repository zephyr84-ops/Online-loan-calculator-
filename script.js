// ======== GET ELEMENTS ========

const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const calculatorPage = document.getElementById("calculatorPage");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const logoutBtn = document.getElementById("logoutBtn");
const calculateBtn = document.getElementById("calculateBtn");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

// ======== PAGE SWITCH ========

showRegister.onclick = function (e) {
    e.preventDefault();
    loginPage.classList.remove("active");
    registerPage.classList.add("active");
};

showLogin.onclick = function (e) {
    e.preventDefault();
    registerPage.classList.remove("active");
    loginPage.classList.add("active");
};

// ======== REGISTER ========

registerForm.onsubmit = function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    registerMessage.className = "message";

    if (password !== confirm) {
        registerMessage.classList.add("error");
        registerMessage.innerHTML = "Passwords do not match.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(user => user.email === email);

    if (exists) {
        registerMessage.classList.add("error");
        registerMessage.innerHTML = "Email already exists.";
        return;
    }

    users.push({
        fullName,
        email,
        phone,
        password
    });

    localStorage.setItem("users", JSON.stringify(users));

    registerMessage.classList.add("success");
    registerMessage.innerHTML = "Registration Successful.";

    registerForm.reset();

    setTimeout(() => {
        registerPage.classList.remove("active");
        loginPage.classList.add("active");
        registerMessage.className = "message";
    }, 2000);
};

// ======== LOGIN ========

loginForm.onsubmit = function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    loginMessage.className = "message";

    if (!user) {
        loginMessage.classList.add("error");
        loginMessage.innerHTML = "Invalid Email or Password.";
        return;
    }

    loginMessage.classList.add("success");
    loginMessage.innerHTML = "Login Successful.";

    setTimeout(() => {
        loginPage.classList.remove("active");
        calculatorPage.classList.add("active");
        loginMessage.className = "message";
        loginForm.reset();
    }, 1000);
};

// ======== LOGOUT ========

logoutBtn.onclick = function () {
    calculatorPage.classList.remove("active");
    loginPage.classList.add("active");
};

// ======== CALCULATOR ========

calculateBtn.onclick = function () {

    let amount = parseFloat(document.getElementById("amount").value);
    let interest = parseFloat(document.getElementById("interest").value);
    let years = parseFloat(document.getElementById("years").value);

    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
        alert("Please fill all fields");
        return;
    }

    let monthlyRate = interest / 100 / 12;
    let months = years * 12;

    let monthlyPayment =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

    let totalPayment = monthlyPayment * months;
    let totalInterest = totalPayment - amount;

    document.getElementById("monthly").textContent = monthlyPayment.toFixed(2);
    document.getElementById("totalInterest").textContent = totalInterest.toFixed(2);
    document.getElementById("totalPayment").textContent = totalPayment.toFixed(2);
};