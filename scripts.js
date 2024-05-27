document.getElementById('vaccinationForm').addEventListener('submit', async (e) => {  //add event listener for the submit form event
    e.preventDefault();

    const formData = { //create formData object
        name: document.getElementById('name').value, 
        age: document.getElementById('age').value,
        vaccine: document.getElementById('vaccine').value
    };

    try {
        const response = await fetch('/', { //sends form data
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) { //if successful, show user with json
            const result = await response.json();
            alert('Form submitted successfully! ID: ' + result.id);
        } else { //alert user about error
            alert('Error submitting form.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

document.getElementById('fetchResponses').addEventListener('click', async () => { //add event listener for the fetch all responses event
    try {
        const response = await fetch('/'); //send GET request 
        const responses = await response.json();

        const responsesDiv = document.getElementById('responses'); //display responses
        responsesDiv.innerHTML = '';

        responses.forEach(response => {
            const responseElement = document.createElement('div');
            responseElement.innerHTML = `
                <p><strong>Name:</strong> ${response.name}</p>
                <p><strong>Age:</strong> ${response.age}</p>
                <p><strong>Vaccine:</strong> ${response.vaccine}</p>
                <hr>
            `;
            responsesDiv.appendChild(responseElement);
        });
    } catch (error) { //error handling
        console.error('Error fetching responses:', error);
        alert('An error occurred while fetching responses.');
    }
});
