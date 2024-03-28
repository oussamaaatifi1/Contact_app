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


async function get() {
    const response = await fetch("/contact.json");
    const data = await response.json();

    const recentMembersContainer = document.querySelector('.recent_members');
    const memberContactContainer = document.querySelector('.memeber_contact');
    const contactDetailsContainer = document.querySelector('.contact_details');

    // Loop for adding elements with class "cont"
    data.results.slice(0, 5).forEach((contact, index) => {
        // Creating elements for recent members
        const recentMemberElement = document.createElement("div");
        recentMemberElement.classList.add("cont");
        recentMemberElement.innerHTML = `
            <img src="${contact.picture}" class="object-fit-fill border rounded" alt="...">
            <p class="full_name">${contact.first_name} ${contact.last_name}</p>
        `;
        recentMemberElement.addEventListener('click', () => {
            displayContactInfo(contact);
        });
        recentMembersContainer.appendChild(recentMemberElement);
    });

    // Loop for adding elements with class "fullname"
    data.results.slice(0, 8).forEach((contact, index) => {
        // Creating elements for member contact
        const memberContactElement = document.createElement("div");
        memberContactElement.classList.add("fullname");
        memberContactElement.innerHTML = `
            <div class="photo">
                <img src="${contact.picture}" class="object-fit-fill border rounded" alt="...">
            </div>
            <div class="title">
                <h2>${contact.first_name} ${contact.last_name}</h2>
            </div>
        `;
        memberContactElement.addEventListener('click', () => {
            displayContactInfo(contact);
        });
        memberContactContainer.appendChild(memberContactElement);
    });

    function displayContactInfo(contact) {
        // Clear previous contact details
        contactDetailsContainer.innerHTML = '';

        // Create elements for displaying contact details
        const detailsElement = document.createElement('div');
        detailsElement.innerHTML = `
            <h2>Contact Information</h2>
            <img src="${contact.picture}">
            <p><strong>Name:</strong> ${contact.first_name} ${contact.last_name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <p><strong>Address:</strong> ${contact.address.street}, ${contact.address.city}, ${contact.address.state}, ${contact.address.country} ${contact.address.postcode}</p>
            <p><strong>Gender:</strong> ${contact.gender}</p>
            <p><strong>Work Station:</strong> ${contact.work_station}</p>
        `;
        contactDetailsContainer.appendChild(detailsElement);
    }
}

get();