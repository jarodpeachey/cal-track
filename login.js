const loginControl = (function() {
   const loadEventListeners = function () {
      document.getElementById('loginBtn').addEventListener('click', logIn);
   }

   const logIn = function (e) {
      let username = document.getElementById('loginUsername').value;
      let password = document.getElementById('loginPassword').value;

      console.log(username);
      const users = storageControl.getUsers();

      users.forEach(function (user) {
         if (user.username == username && user.password == password) {
            window.location.href = 'session.html';
            sessionControl.startNewSession(user);
         } else {
            alert('The username/password is incorrect. Please try again.');
         }
      })

      e.preventDefault()
   };

   return {
      init: function() {
         loadEventListeners();
      }
   }
})()

loginControl.init();