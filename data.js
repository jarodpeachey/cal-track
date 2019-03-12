const mainDataControl = (function () {
   const User = function (id, name, username, password, meals, workouts, caloriesGained, caloriesLost, netCalories) {
      this.id = id;
      this.name = name;
      this.username = username;
      this.password = password;
      this.meals = meals;
      this.workouts = workouts;
      this.caloriesGained = caloriesGained;
      this.caloriesLost = caloriesLost;
      this.netCalories = netCalories;
   }

   const mainData = {
      users: []
   }

   return {
      createUser: function (name, username, password) {
         let ID;
         // Create ID
         if (mainData.users.length > 0) {
            ID = mainData.users[mainData.users.length - 1].id + 1;
         } else {
            ID = 0;
         }

         // Create user
         let newUser = new User(ID, name, username, password, [], [], 0, 0, 0);

         // Append to users array
         mainData.users.push(newUser);

         // Return newUser
         return newUser;
      },
      setCurrentUser: function(user) {
         storageControl.setCurrentUser(user);
      },
      getCurrentUser: function() {
         return JSON.parse(localStorage.getItem('currentUser'));
      },
      updateUserMeals: function (newMeal) {
         let currentUser = mainDataControl.getCurrentUser();
         const usersArray = storageControl.getUsers();

         usersArray.forEach(function(user) {
            if (user.name == currentUser.name) {
               user.meals.push(newMeal);
               currentUser.meals.push(newMeal);
            }
         });

         localStorage.setItem('users', JSON.stringify(usersArray));
         localStorage.setItem('currentUser', JSON.stringify(currentUser));
      },
      updateUserCalories: function() {
         const meals = mainDataControl.getCurrentUser().meals;
         const workouts = mainDataControl.getCurrentUser().workouts;

         let caloriesGained = 0;
         let caloriesLost = 0;

         meals.forEach(function(meal) {
            caloriesGained += meal.calories;
         })

         workouts.forEach(function(workout) {
            caloriesGained += workout.calories;
         })

         let netCalories = caloriesGained - caloriesLost;

         let currentUser = mainDataControl.getCurrentUser();
         const usersArray = storageControl.getUsers();

         usersArray.forEach(function(user) {
            if (user.name == currentUser.name) {
               user.caloriesGained = caloriesGained;
               user.caloriesLost = caloriesLost;
               user.netCalories = netCalories;

               currentUser.caloriesGained = caloriesGained;
               currentUser.caloriesLost = caloriesLost;
               currentUser.netCalories = netCalories;
            }
         });

         localStorage.setItem('users', JSON.stringify(usersArray));
         localStorage.setItem('currentUser', JSON.stringify(currentUser));

         console.log(JSON.parse(localStorage.getItem('currentUser')));
      },
      getCaloriesGained: function () {
         const currentUser = mainDataControl.getCurrentUser();

         const calories = currentUser.caloriesGained;

         return calories;
      },
      updateMeal: function (updatedMeal) {
         let currentUser = mainDataControl.getCurrentUser();
         let usersArray = storageControl.getUsers();

         usersArray.forEach(function(user) {
            user.meals.forEach(function(meal, index) {
               if (meal.id == updatedMeal.id) {
                  user.meals[index].name = updatedMeal.name;
                  user.meals[index].calories = updatedMeal.calories;

                  currentUser.meals[index].name = updatedMeal.name;
                  currentUser.meals[index].calories = updatedMeal.calories;
               }
            })
         })

         localStorage.setItem('users', JSON.stringify(usersArray));
         localStorage.setItem('currentUser', JSON.stringify(currentUser));
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
      },
      setCurrentUser: function (user) {
         localStorage.setItem('currentUser', JSON.stringify(user));
      }
   }
})()