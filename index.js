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


    updateAppState: function(updateType) {
        if (updateType == 'logged-in') {
            document.getElementById('name').innerHTML = this.name;
            document.getElementById('avatar').setAttribute("src", this.avatar);
            document.getElementById('logInForm').style.display = 'none';
            document.getElementById('loggedInBlock').style.display = 'flex';

            return;
        }
        if (updateType == 'log-in-error') {
            document.getElementById('inputError').style.display = 'flex';
            document.getElementById('email').style.color = '#ed4159';
            document.getElementById('email').style.border = '1px solid #ed4159';
            document.getElementById('password').style.color = '#ed4159';
            document.getElementById('password').style.border = '1px solid #ed4159';
            document.getElementById('password').value = '';

            return;
        }
        if (updateType == 'log-out') {
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            document.getElementById('logInForm').style.display = 'flex';
            document.getElementById('loggedInBlock').style.display = 'none';

            return;
        };
    },

    
    dataHandle: function(data, value) {
        this.inputDataError = false;

        // document.getElementById('inputError').style.display = 'none';
        document.getElementById(data).style.color = '#262626';
        document.getElementById(data).style.border = 'none';

        if (event.keyCode == 13) {
            this.logIn();

            return;
        };

        this[data] = value;
    },


    dataCheck: function() {
        if (!this.email.length || !this.password.length) {
            this.inputDataError = true;

            this.updateAppState('log-in-error');
            
        } else {
            this.inputDataError = false;
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
    
                    app.updateAppState('logged-in');
                }
                if (this.status == 400) {
                    app.inputDataError = true;

                    app.updateAppState('log-in-error');
                };
            };

            http.send(JSON.stringify(loginData));
        } else {
            return;
        }
    },

    logOut: function() {
        this.loggedIn = false;
        this.email = '';
        this.password = '';
        this.avatar = '';
        this.name = '';

        this.updateAppState('log-out');
    }
}
