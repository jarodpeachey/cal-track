const signUpUIControl = (function () {

   return {
      displayLoginPage: function () {
         const container = document.getElementById('container');

         container.innerHTML = `
         <form style='max-width: 500px; margin: 0 auto;'>
            <h1 class="center-text">Log In</h1>
            <div class="input-element medium">
               <label for="">Username</label>
               <input type="text" class="full-width loginUsername" placeholder="Username" id="loginUsername">
            </div>
            <div class="input-element medium">
               <label for="">Password</label>
               <input type="password" class="full-width loginPassword" placeholder="Password" id="loginPassword">
            </div>
            <input type="submit" value="Log In" class="accent medium full-width loginBtn" id="loginBtn">
         </form>
         `;
      }
   }
})()

const signupControl = (function (storageControl, mainDataControl) {
   const loadEventListeners = function () {
      document.getElementById('signupBtn').addEventListener('click', signUp);

      document.addEventListener('click', logIn);
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
         
         signUpUIControl.displayLoginPage();
      } else {
         users.forEach(function (user) {
            if (user.username == username) {
               alert('Please choose a different username')
            } else {
               newUser = mainDataControl.createUser(name, username, password);

               storageControl.addNewUser(newUser);
               
               signUpUIControl.displayLoginPage();
            }
         })
      }

      e.preventDefault();
   }

   const logIn = function(e) {
      if (e.target.classList.contains('loginBtn')) {
         let username = document.getElementById('loginUsername').value;
         let password = document.getElementById('loginPassword').value;

         console.log(username);
         const users = storageControl.getUsers();

         users.forEach(function(user) {
            if (user.username == username && user.password == password) {
               sessionControl.startNewSession(user);
            } else {
               alert('The username/password is incorrect. Please try again.');
            }
         })
      }

      e.preventDefault()
   };

   return {
      init: function () {
         console.log('App initialized');
         loadEventListeners();
      }
   }
})(storageControl, mainDataControl)

signupControl.init();