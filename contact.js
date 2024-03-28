function validateForm() {
    var firstName = document.getElementById("floating_first_name").value.trim();
    var lastName = document.getElementById("floating_last_name").value.trim();
    var email = document.getElementById("floating_email").value.trim();
    var phone = document.getElementById("floating_phone").value.trim();
    var company = document.getElementById("floating_company").value.trim();

    var isValid = true;

    if (firstName === "") {
        document.getElementById("first_name_error").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("first_name_error").classList.add("hidden");
    }

    if (lastName === "") {
        document.getElementById("last_name_error").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("last_name_error").classList.add("hidden");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("email_error").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("email_error").classList.add("hidden");
    }

    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        document.getElementById("phone_error").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("phone_error").classList.add("hidden");
    }

    if (company === "") {
        document.getElementById("company_error").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("company_error").classList.add("hidden");
    }

    return isValid;
}