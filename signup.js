const signupControl = (function (storageControl, mainDataControl) {
   const loadEventListeners = function () {
         document.getElementById('signupBtn').addEventListener('click', signUp);  
   }

   const signUp = function (e) {
      let name = document.querySelector('#signupName').value;
      let username = document.querySelector('#signupUsername').value;
      let password = document.querySelector('#signupPassword').value;

      let newUser;

      const users = storageControl.getUsers();

      if (users == null) {
         newUser = mainDataControl.createUser(name, username, password);

         storageControl.addNewUser(newUser);

         window.location.href = 'login.html';
      } else {
         users.forEach(function (user) {
            if (user.username == username) {
               alert('Please choose a different username')
            } else {
               newUser = mainDataControl.createUser(name, username, password);

               storageControl.addNewUser(newUser);

               window.location.href = 'login.html';
            }
         })
      }

      e.preventDefault();
   }

   return {
      init: function () {
         loadEventListeners();
      }
   }
})(storageControl, mainDataControl)

signupControl.init();