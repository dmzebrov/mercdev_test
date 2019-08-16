var app = {
    loggedIn: false,
    
    email: '',
    password: '',
    inputDataError: false,

    avatar: '',
    name: '',
    

    init: function() {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    },


    updateAppState: function() {
        if (this.loggedIn) {
            document.getElementById('name').innerHTML = this.name;
            document.getElementById('avatar').setAttribute("src", this.avatar);
            document.getElementById('logInForm').style.display = 'none';
            document.getElementById('loggedInBlock').style.display = 'flex';

            return;
        }
        if (this.inputDataError) {
            document.getElementById('inputError').style.display = 'flex';
            document.getElementById('email').style.color = '#ed4159';
            document.getElementById('email').style.border = '1px solid #ed4159';
            document.getElementById('password').value = '';

            return;
        }
        else {
            this.email = '';
            this.password = '';
            this.avatar = '';
            this.name = '';

            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            document.getElementById('logInForm').style.display = 'flex';
            document.getElementById('loggedInBlock').style.display = 'none';
        }
    },


    dataHandle: function(data, value) {
        this[data] = value;
    },


    dataCheck: function() {
        if (!this.email.length && !this.password.length) {
            this.inputDataError = true;

            document.getElementById('inputError').style.display = 'flex';
            document.getElementById('email').style.color = '#ed4159';
            document.getElementById('email').style.border = '1px solid #ed4159';
            document.getElementById('password').value = '';
        } else {
            this.inputDataError = false;

            document.getElementById('inputError').style.display = 'none';
            document.getElementById('email').style.color = '#262626';
            document.getElementById('email').style.border = 'none';
        };
    },


    logIn: function() {
        this.dataCheck();
        
        if (!this.inputDataError) {
            var loginData = {
                'email': this.email,
                'password': this.password
            };

            const http = new XMLHttpRequest();
            const url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login';

            http.open("POST", url, true);
            http.setRequestHeader("Content-Type", "application/json");

            http.onload = function() {
                const response = JSON.parse(http.responseText);
                if (this.status == 200) {
                    app.inputDataError = false;
                    app.loggedIn = true;

                    app.name = response.name;
                    app.avatar = response.photoUrl;
    
                    app.updateAppState();
                }
                if (this.status == 400) {
                    app.inputDataError = true;

                    app.updateAppState();
                };
            };

            http.send(JSON.stringify(loginData));
        } else {
            console.log('stop it!');
        }
    },

    logOut: function() {
        this.loggedIn = false;

        this.updateAppState();
    }


}

