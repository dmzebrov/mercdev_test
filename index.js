var app = {
  loggedIn: false,

  email: "",
  password: "",
  inputDataError: false,

  avatar: "",
  name: "",

  logIn: async function(e) {
    e.preventDefault();

    this.handleData("email");
    this.handleData("password");
    this.checkData();

    if (!this.inputDataError) {
      let loginData = {
        email: this.email,
        password: this.password
      };

      let request = await this.makeRequest(
        "https://us-central1-mercdev-academy.cloudfunctions.net/login",
        "POST",
        loginData
      );
      let accountData = await request.json();

      if (request.status == 200) {
        this.inputDataError = false;
        this.loggedIn = true;

        this.name = accountData.name;
        this.avatar = accountData.photoUrl;

        this.updateAppState("logged-in");
      }
      if (request.status == 400) {
        this.inputDataError = true;
        this.updateAppState("log-in-error");
      }
    } else {
      return;
    }
  },

  logOut: function() {
    this.loggedIn = false;
    this.email = "";
    this.password = "";
    this.avatar = "";
    this.name = "";

    this.updateAppState("log-out");
  },

  /* ---> UTILITIES */
  init: function() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  },

  updateAppState: function(updateType) {
    if (updateType == "logged-in") {
      document.getElementById("name").innerHTML = this.name;
      document.getElementById("avatar").setAttribute("src", this.avatar);
      document.getElementById("logInForm").style.display = "none";
      document.getElementById("loggedInBlock").style.display = "flex";

      return;
    }
    if (updateType == "log-in-error") {
      document.getElementById("inputError").style.display = "flex";
      document.getElementById("email").style.color = "#ed4159";
      document.getElementById("email").style.border = "1px solid #ed4159";
      document.getElementById("password").style.color = "#ed4159";
      document.getElementById("password").style.border = "1px solid #ed4159";
      document.getElementById("password").value = "";

      return;
    }
    if (updateType == "log-out") {
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

      document.getElementById("logInForm").style.display = "flex";
      document.getElementById("loggedInBlock").style.display = "none";

      return;
    }
  },

  handleData: function(data) {
    this.inputDataError = false;

    document.getElementById(data).style.color = "#262626";
    document.getElementById(data).style.border = "none";

    this[data] = document.getElementById(data).value;
  },

  checkData: function() {
    if (!this.email.length || !this.password.length) {
      this.inputDataError = true;

      this.updateAppState("log-in-error");
    } else {
      this.inputDataError = false;
    }
  },

  makeRequest: async (url, method, data) => {
    try {
      let response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
  /* UTILITIES <--- */
};
