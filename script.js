const firstName = document.getElementById("first_name");
const email = document.getElementById("email_name");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");
const submitBtn = document.querySelector(".submit-btn");

function getErrorDiv(input) {
    return input.parentElement.nextElementSibling;
}

function setError(input, message) {
    input.setCustomValidity(message); 
    getErrorDiv(input).textContent = message;
    input.closest(".input-container").classList.add("has-error"); // CSS fallback to ensure border changes color
}

function clearError(input) {
    input.setCustomValidity("");
    getErrorDiv(input).textContent = "";
    input.closest(".input-container").classList.remove("has-error");
}

// INPUT VALIDATION, SANITISATION AND CUSTOM ERROR MESSAGES

function validateFirstName() {
    const value = firstName.value.trim();

    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (value.length === 0) {
        setError(firstName, "First name is required.");
        return false;
    }

    if (value.length < 2) {
        setError(firstName, "First name must be at least 2 characters.");
        return false;
    }

    if (!nameRegex.test(value)) {
        setError(firstName, "First name contains invalid characters.");
        return false;
    }

    clearError(firstName);
    return true;
}

function validateEmail() {
    if (email.validity.valueMissing) {
        setError(email, "Email is required.");
        return false;
    }
    if (email.validity.typeMismatch) {
        setError(email, "Please enter a valid email address.");
        return false;
    }
    clearError(email);
    return true;
}

function validatePassword() {
    if (password.validity.valueMissing) {
        setError(password, "Password is required.");
        return false;
    }
    if (password.validity.tooShort) {
        setError(password, "Password must be at least 8 characters.");
        return false;
    }
    clearError(password);
    return true;
}

// BLUR LISTEN TO CHECK INPUT VALIDATION

firstName.addEventListener("blur", validateFirstName);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);

// FOCUS LISTEN TO REMOVE ERRORS

firstName.addEventListener("focus", () => clearError(firstName));
email.addEventListener("focus", () => clearError(email));
password.addEventListener("focus", () => clearError(password));
passwordConfirm.addEventListener("focus", () => clearError(passwordConfirm));

// SUBMIT ON CLICK LISTEN FOR PASSWORD CONRFIRMATION

submitBtn.addEventListener("click", (e) => {
    let valid = true;

    // Validate fields that aren't password confirmation
    if (!validateFirstName()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validatePassword()) valid = false;

    // Password confirmation (submit ONLY)
    clearError(passwordConfirm);

    if (passwordConfirm.validity.valueMissing) {
        setError(passwordConfirm, "Please confirm your password.");
        valid = false;
    } else if (password.value !== passwordConfirm.value) {
        setError(passwordConfirm, "Passwords do not match.");

        password.value = "";
        passwordConfirm.value = "";
        password.focus();

        valid = false;
    }

    // if any validation fails, clear password inputs
    if (!valid) {
        password.value = "";
        passwordConfirm.value = "";
        setError(passwordConfirm, "Please confirm your password.");
        e.preventDefault();
        return;
    }

    // If everything is valid, form proceeds naturally - TO BE COMPLETE

});