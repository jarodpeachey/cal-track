const mainDataControl = (function () {
   const User = function (id, name, username, password, meals) {
      this.id = id;
      this.name = name;
      this.username = username;
      this.password = password;
      this.meals = meals;
   }

   const data = {
      users: []
   }

   return {
      createUser: function (name, username, password) {
         let ID;
         // Create ID
         if (data.users.length > 0) {
            ID = data.users[data.users.length - 1].id + 1;
         } else {
            ID = 0;
         }

         // Create user
         let newUser = new User(ID, name, username, password, []);

         // Append to users array
         data.users.push(newUser);

         // Return newUser
         return newUser;
      }
   }
})()

const storageControl = (function () {
   return {
      addNewUser: function (user) {
         let usersArray;

         if (localStorage.getItem('users') === null) {
            usersArray = [];
         } else {
            usersArray = JSON.parse(localStorage.getItem('users'));
         }

         usersArray.push(user);

         localStorage.setItem('users', JSON.stringify(usersArray));
      },
      getUsers: function () {
         let users = [];
         if (JSON.parse(localStorage.getItem('users' === null))) {
            users = [];
         } else {
            users = JSON.parse(localStorage.getItem(`users`));
         }

         return users;
      }
   }
})()