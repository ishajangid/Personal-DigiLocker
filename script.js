document.querySelector('.form-inner').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const isSignUp = event.submitter.classList.contains('signup-btn');
    console.log(isSignUp);
    if(isSignUp){
        console.log("signing in");
        const username = event.target.elements.sname.value;
        const password = event.target.elements.spass.value;
        const email = event.target.elements.smail.value;
        console.log(email);
        const isAdmin = false;
        const isLogin = false;
        signUp(username,password,isAdmin,isLogin,email);
    }
    else{
        const username = event.target.elements.uname.value;
        console.log(username);
        const password = event.target.elements.psw.value;
        login(username, password);
    }
});

async function signUp(username, password, isAdmin, isLogin, email) {
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, isAdmin, isLogin, email }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(error => { throw new Error(error.message) });
            }
        })
        .then((data) => {
            form.reset();
            console.log(data.message);
        })
        .catch((error) => {
            console.log('There was a problem with the signup operation:', error);
        });
        window.location.href = 'index.html';
}

async function login(username, password) {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                const error = await response.json();
                throw new Error(error.message);
            }
        })
        .then((data) => {
            console.log(data.message);
            window.location.href = './upload.html';
        })
        .catch((error) => {
            console.log('There was a problem with the login operation:', error);
        });
}
