const loginControl = (function () {
   const loadEventListeners = function () {
      document.getElementById('loginBtn').addEventListener('click', logIn);
   }

   const logIn = function (e) {
      let username = document.getElementById('loginUsername').value;
      let password = document.getElementById('loginPassword').value;

      const user = mainDataControl.getUserByUsername(username);

      console.log(user);

      if (user == null) {
         alert('That username does not exist. please enter another one.');
      } else if (user.password == password) {
         mainDataControl.setCurrentUser(user);
         window.location.href = 'dashboard.php';
      } else {
         alert('The password you entered is incorrect.');
      }

      // for (let i = 0; i < users.length; i++) {
      //    if (users[i].username == username && users[i].password == password){

      //       break;
      //    } else {
      //       alert('The username/password is incorrect. Please try again.');
      //       break;
      //    }
      // }

      e.preventDefault()
   };

   return {
      init: function () {
         loadEventListeners();
      }
   }
})()

loginControl.init();