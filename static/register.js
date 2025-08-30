const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const messageDiv = document.getElementById('message');

// Get camera access
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing camera:', err);
        messageDiv.innerHTML = '<p style="color: red;">Error accessing camera. Please allow camera permissions.</p>';
    });

function capturePhoto() {
    context.drawImage(video, 0, 0, 320, 240);
    canvas.style.display = 'block';
    messageDiv.innerHTML = '<p style="color: green;">Photo captured successfully!</p>';
}

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData();
    formData.append('username', this.username.value);
    formData.append('email', this.email.value);
    formData.append('password', this.password.value);
    formData.append('first_name', this.first_name.value);
    formData.append('last_name', this.last_name.value);
    formData.append('address', this.address.value);
    formData.append('phone', this.phone.value);

    // Add photo if captured
    if (canvas.style.display !== 'none') {
        canvas.toBlob(blob => {
            formData.append('image', blob, 'photo.jpg');
            submitForm(formData);
        }, 'image/jpeg');
    } else {
        submitForm(formData);
    }
});

function submitForm(formData) {
    messageDiv.innerHTML = '<p style="color: blue;">Submitting registration...</p>';
    
    fetch('/api/users/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(JSON.stringify(err));
            });
        }
        return response.json();
    })
    .then(data => {
        messageDiv.innerHTML = '<p style="color: green;">✅ User registered successfully!</p>';
        console.log('Success:', data);
        // Optionally reset form
        document.getElementById('userForm').reset();
        canvas.style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        try {
            const errorData = JSON.parse(error.message);
            let errorMessage = '<p style="color: red;">❌ Registration failed:</p><ul>';
            for (const [field, errors] of Object.entries(errorData)) {
                errorMessage += `<li><strong>${field}:</strong> ${errors.join(', ')}</li>`;
            }
            errorMessage += '</ul>';
            messageDiv.innerHTML = errorMessage;
        } catch {
            messageDiv.innerHTML = '<p style="color: red;">❌ Registration failed. Please try again.</p>';
        }
    });
}
