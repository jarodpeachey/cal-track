const loginControl = (function () {
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
            // Set current user
            mainDataControl.setCurrentUser(user);

            // Get current user
            const currentUser = mainDataControl.getCurrentUser();

            // Display user dashboard
            sessionUIControl.displayDashboard(user);

            sessionControl.startNewSession();
         } else {
            alert('The username/password is incorrect. Please try again.');
         }
      })

      e.preventDefault()
   };

   return {
      init: function () {
         loadEventListeners();
      }
   }
})()

loginControl.init();