const appControl = (function () {
   const loadEventListeners = function (storageControl, mainDataControl) {
      document.getElementById('signupBtn').addEventListener('click', signUp);
   }

   const signUp = function (e) {
      let name = document.querySelector('#signupName').value;
      let username = document.querySelector('#signupUsername').value;
      let password = document.querySelector('#signupPassword').value;

      const newUser = mainDataControl.createUser(name, username, password);

      console.log(newUser);

      storageControl.addNewUser(newUser);

      let users;

      users = JSON.parse(localStorage.getItem(`users`))

      console.log(users);

      e.preventDefault();
   }

   return {
      init: function () {
         console.log('App initialized');
         loadEventListeners();
      }
   }
})(storageControl, mainDataControl)

appControl.init();