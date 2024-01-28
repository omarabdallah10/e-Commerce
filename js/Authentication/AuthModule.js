class AuthModule {
    static activeUser = JSON.parse(localStorage.getItem('activeuser'));
    static isGuest() {
        if (!AuthModule.activeUser) {
            return true;
        }
    }

    static isAuthorized() {
        if (!AuthModule.activeUser) {
            // Create a new container element
            const container = document.createElement('div');
            container.innerHTML = this.get404HTML();

            // Replace the body content with the container
            document.body.innerHTML = '';
            document.body.appendChild(container);

            throw new Error('Not authorized');
        }
    }
    static isAdmin(){
        if(AuthModule.activeUser.role != 'Admin'){
            const container = document.createElement('div');
            container.innerHTML = this.get404HTML();
            // Replace the body content with the container
            document.body.innerHTML = '';
            document.body.appendChild(container);
            throw new Error('Not authorized');       
        }    
    }

    static get404HTML() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>404 Not Found</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        text-align: center;
                        padding: 50px;
                    }

                    h1 {
                        color: #d9534f;
                    }

                    p {
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <h1>404 Not Found</h1>
                <p>Sorry, the page you are looking for might be in another castle.</p>
                <p><a href="/">Go back to the home page</a></p>
            </body>
            </html>
        `;
    }

    static redirectIfAuthorized() {
        if (AuthModule.activeUser) {
            window.location.replace('./Homepage.html');
        }
    }

    static logout() {
        localStorage.removeItem('activeuser');
        window.location.replace('./Auth.html');
    }
    }
        


export default AuthModule;
