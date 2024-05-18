
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('uploadform');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }
            const responseData = await response.text();
            console.log('Upload successful:', responseData);
            form.reset();
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    });
});
function logout() {
    try{
        const response = fetch('http://localhost:3000/logout', {
            method: 'POST',
            body: ''
        });
        window.location.href = 'index.html';
    }
    catch(error){
        console.error('Error logout:', error.message);
    }
}