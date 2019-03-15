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

   return {
      createUser: function (name, username, password) {
         let users = storageControl.getUsers();
         let ID;
         // Create ID
         if (users.length > 0) {
            ID = users[users.length - 1].id + 1;
         } else {
            ID = 0;
         }

         // Create user
         let newUser = new User(ID, name, username, password, [], [], 0, 0, 0);

         // Return new user
         return newUser;
      },
      setCurrentUser: function(user) {
         storageControl.setCurrentUser(user);
      },
      getCurrentUser: function() {
         return JSON.parse(localStorage.getItem('currentUser'));
      },
      clearCurrentUser: function() {
         localStorage.removeItem('currentUser');
         window.location.href = 'index.html';
      },
      getUserByUsername: function(username) {
         let users = storageControl.getUsers();
         let found = null;

         users.forEach(function(user) {
            if (user.username == username) {
               found = user;
            }
         })

         return found;
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
      updateUserWorkouts: function (newWorkout) {
         let currentUser = mainDataControl.getCurrentUser();
         const usersArray = storageControl.getUsers();

         usersArray.forEach(function(user) {
            if (user.name == currentUser.name) {
               user.workouts.push(newWorkout);
               currentUser.workouts.push(newWorkout);
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
            caloriesLost += workout.calories;
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
      getCaloriesLost: function(){
         const currentUser = mainDataControl.getCurrentUser();

         const calories = currentUser.caloriesLost;

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
      },
      deleteMeal: function(mealToDelete){
         let currentUser = mainDataControl.getCurrentUser();
         let usersArray = storageControl.getUsers();

         usersArray.forEach(function(user) {
            user.meals.forEach(function(meal, index) {
               if (meal.id == mealToDelete.id) {
                  user.meals.splice(index, 1);
                  currentUser.meals.splice(index, 1);
               }
            })
         })

         localStorage.setItem('users', JSON.stringify(usersArray));
         localStorage.setItem('currentUser', JSON.stringify(currentUser));
      },
      deleteAllMeals: function () {
         let currentUser = mainDataControl.getCurrentUser();
         let usersArray = storageControl.getUsers();

         usersArray.forEach(function(user) {
            if (user.id == currentUser.id) {
               user.meals = [];
               currentUser.meals = [];
            }
         })

         localStorage.setItem('users', JSON.stringify(usersArray));
         localStorage.setItem('currentUser', JSON.stringify(currentUser));
      },
      updateWorkout: function (updatedWorkout) {
         let currentUser = mainDataControl.getCurrentUser();
         let usersArray = storageControl.getUsers();

         usersArray.forEach(function(user) {
            user.workouts.forEach(function(workout, index) {
               if (workout.id == updatedWorkout.id) {
                  user.workouts[index].name = updatedWorkout.name;
                  user.workouts[index].calories = updatedWorkout.calories;

                  currentUser.workouts[index].name = updatedWorkout.name;
                  currentUser.workouts[index].calories = updatedWorkout.calories;
               }
            })
         })

         localStorage.setItem('users', JSON.stringify(usersArray));
         localStorage.setItem('currentUser', JSON.stringify(currentUser));
      },
      deleteWorkout: function(workoutToDelete){
         let currentUser = mainDataControl.getCurrentUser();
         let usersArray = storageControl.getUsers();

         usersArray.forEach(function(user) {
            user.workouts.forEach(function(workout, index) {
               if (workout.id == workoutToDelete.id) {
                  user.workouts.splice(index, 1);
                  currentUser.workouts.splice(index, 1);
               }
            })
         })

         localStorage.setItem('users', JSON.stringify(usersArray));
         localStorage.setItem('currentUser', JSON.stringify(currentUser));
      },
      deleteAllWorkouts: function () {
         let currentUser = mainDataControl.getCurrentUser();
         let usersArray = storageControl.getUsers();

         usersArray.forEach(function(user) {
            if (user.id == currentUser.id) {
               user.workouts = [];
               currentUser.workouts = [];
            }
         })

         localStorage.setItem('users', JSON.stringify(usersArray));
         localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }, 
      loadEventListeners: function () {
         document.querySelector('.logout').addEventListener('click', function(e) {
            if(confirm('Are you sure you want to log out?')) {
               mainDataControl.clearCurrentUser();
            }
            e.preventDefault();
         })
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
         if (JSON.parse(localStorage.getItem('users'))) {
            users = JSON.parse(localStorage.getItem(`users`));
         } else {
            users = [];
         }

         console.log(users);

         return users;
      },
      setCurrentUser: function (user) {
         localStorage.setItem('currentUser', JSON.stringify(user));
      }
   }
})()