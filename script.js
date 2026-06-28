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

// ======== OPEN REGISTER ========

if (showRegister) {
    showRegister.onclick = function (e) {
        e.preventDefault();

        loginPage.classList.remove("active");
        registerPage.classList.add("active");
    };
}

// ======== BACK TO LOGIN ========

if (showLogin) {
    showLogin.onclick = function (e) {
        e.preventDefault();

        registerPage.classList.remove("active");
        loginPage.classList.add("active");
    };
}

// ======== REGISTER ========

if (registerForm) {
    registerForm.onsubmit = function (e) {
        e.preventDefault();

        alert("Registration Successful");

        registerPage.classList.remove("active");
        loginPage.classList.add("active");
    };
}

// ======== LOGIN ========

if (loginForm) {
    loginForm.onsubmit = function (e) {
        e.preventDefault();

        loginPage.classList.remove("active");
        calculatorPage.classList.add("active");
    };
}

// ======== LOGOUT ========

if (logoutBtn) {
    logoutBtn.onclick = function () {
        calculatorPage.classList.remove("active");
        loginPage.classList.add("active");
    };
}

// ======== CALCULATOR ========

if (calculateBtn) {
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

        document.getElementById("monthly").innerHTML =
            monthlyPayment.toFixed(2);

        document.getElementById("totalInterest").innerHTML =
            totalInterest.toFixed(2);

        document.getElementById("totalPayment").innerHTML =
            totalPayment.toFixed(2);
    };
}
