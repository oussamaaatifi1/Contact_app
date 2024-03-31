// validateur
function PopUp_validation(event) {
    const popUp_full_Name_input = document.querySelector("[name='full_name']");
    const popUp_tele_input = document.querySelector("[name='telephone']");
    const popUp_email_input = document.querySelector("[name='email']");
    const popUp_job_input = document.querySelector("[name='job_position']");
    const popUp_address_input = document.querySelector("[name='address']");

    let fullName_valid = false;
    let tele_valid = false;
    let email_valid = false;
    let job_valid = false;
    let address_valid = false;

    if (popUp_full_Name_input.value !== "" && /^[A-Za-z]+$/.test(popUp_full_Name_input.value)) {
      fullName_valid = true;
    }

    let tele_pattern = /^[0-9]{10}$/;
    if (popUp_tele_input.value.match(tele_pattern)) {
      tele_valid = true;
    }

    let email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (popUp_email_input.value.match(email_pattern)) {
      email_valid = true;
    }

    if (popUp_job_input.value !== "") {
      job_valid = true;
    }

    if (popUp_address_input.value !== "") {
      address_valid = true;
    }

    if (fullName_valid === false || tele_valid === false || email_valid === false || job_valid === false || address_valid === false) {
      event.preventDefault();
      console.log("Form validation failed.");
    } else {
      console.log("Form validation successful.");
    }
}




// ajouter memeber contact
document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch data from JSON file
    async function getData() {
        try {
            const response = await fetch("/contact.json");
            const data = await response.json();
            return data.results; // Extract the results array from the JSON data
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // Return an empty array in case of error
        }
    }

    // Function to display contact details
    function displayContactDetails(contact) {
        const contactDetailsContainer = document.querySelector('.contact_details');
        contactDetailsContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="afficher_member">
                        <h2 class="card-title">Contact Information</h2>
                        <img class="card-img-top" src="${contact.picture}" alt="Contact Picture">
                        <div class="contact-details">
                            <div class="full_name">
                                <p class="card-text"><strong>Name:</strong> ${contact.first_name} ${contact.last_name}</p>
                            </div>
                            <p class="card-text"><strong>Email:</strong> ${contact.email}</p>
                            <p class="card-text"><strong>Phone:</strong> ${contact.phone}</p>
                            <p class="card-text"><strong>Address:</strong> ${contact.address.street}, ${contact.address.city}, ${contact.address.state}, ${contact.address.country} ${contact.address.postcode}</p>
                            <p class="card-text"><strong>Gender:</strong> ${contact.gender}</p>
                            <p class="card-text"><strong>Work Station:</strong> ${contact.work_station}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to handle search
    function search() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Fetch all contact elements
        const contactElements = document.querySelectorAll('.fullname');

        // Iterate over each contact element and check if it matches the search term
        contactElements.forEach(contactElement => {
            const fullName = contactElement.querySelector('h2').textContent.toLowerCase();

            // Show or hide the contact element based on whether it matches the search term
            if (fullName.includes(searchTerm)) {
                contactElement.style.display = 'block';
            } else {
                contactElement.style.display = 'none';
            }
        });
    }

    // Event listener for search button click
    const searchButton = document.getElementById('button-addon3');
    searchButton.addEventListener('click', search);

    // Load data and display contacts
getData().then(contacts => {
    const memberContactContainer = document.querySelector('.memeber_contact');
    const recentMembersContainer = document.querySelector('.recent_members');
    memberContactContainer.innerHTML = ''; // Clear previous contacts
    recentMembersContainer.innerHTML = ''; // Clear previous recent members

    // Loop for adding elements for member contact (0-8)
    contacts.slice(0, 8).forEach(contact => {
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
            displayContactDetails(contact);
        });
        memberContactContainer.appendChild(memberContactElement);
    });

    // Loop for adding elements for recent members (0-5)
    contacts.slice(0, 5).forEach(contact => {
        const recentMemberElement = document.createElement("div");
        recentMemberElement.classList.add("cont");
        recentMemberElement.innerHTML = `
            <img src="${contact.picture}" class="object-fit-fill border rounded" alt="...">
            <p class="full_name">${contact.first_name} ${contact.last_name}</p>
        `;
        recentMemberElement.addEventListener('click', () => {
            displayContactDetails(contact);
        });
        recentMembersContainer.appendChild(recentMemberElement);
    });
});


});

get();


// search 
