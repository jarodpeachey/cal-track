const signupControl = (
   function (storageControl, mainDataControl) {
   const loadEventListeners = function () {
      document.getElementById('signupBtn').addEventListener('click', signUp);
   }

   const signUp = function (e) {
      let name = document.querySelector('#signupName').value;
      let username = document.querySelector('#signupUsername').value;
      let password = document.querySelector('#signupPassword').value;

      let newUser;

      const users = storageControl.getUsers();
      const user = mainDataControl.getUserByUsername(username);

      if (user == null) {
         newUser = mainDataControl.createUser(name, username, password);

         storageControl.addNewUser(newUser);

         window.location.href = 'login.php';
      } else {
         alert('Please choose a different username');
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