const sessionUIControl = (function () {
   return {
      displayDashboard: function (user) {
         let container = document.getElementById('container');

         let meals = ``;
         let workouts = ``;

         user.meals.forEach(function (meal) {
            for (i = 0; i < user.meals.length; i++) {
               meals += `
               <li class="collection-item"><strong>${meal.name}</strong> <em class="right">${meal.calories} calories gained</em></li>
               `
            }
         })

         user.workouts.forEach(function (workout) {
            for (i = 0; i < user.workouts.length; i++) {
               workouts += `
               <li class="collection-item"><strong>${workout.name}</strong> <em class="right">${workout.calories} calories gained</em></li>
               `
            }
         })

         container.innerHTML = `
         <div class="row bg-primary">
         <div class="col col-12">
            <div class="center-text p-4">
               <h2 class="m-0">Welcome, ${user.name}! Get started by adding a meal or a workout.</h2>
               <button class="accent mt-2 addMeal">Add Meal</button>
               <button class="accent addWorkout">Add Workout</button>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="col mobile-col-12">
            <div class="center-text dashboard-item">
               <h3 class="mb-0">${user.netCalories} Net Calorie Gain</h3>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="col">
            <div class="dashboard-item center-text">
               <h5>${user.caloriesGained} calories gained</h5>
               <small>
                  <ul class="collection rounded align-text-left">
                  ${meals}
                  </ul>
                  <button class="small accent">See more meals</button>
               </small>
            </div>
         </div>
         <div class="col">
            <div class="dashboard-item center-text">
               <h5>${user.caloriesLost} calories lost</h5>
               <small>
               <ul class="collection rounded align-text-left">
               ${workouts}
               </ul>
                  <button class="small accent">See more workouts</button>
               </small>
            </div>
         </div>
      </div>
         `
      }
   }
})()

const sessionControl = (function () {
   const loadEventListeners = function () {
      document.addEventListener('click', displayMealPage);
   }

   const displayMealPage = function (e) {
      e.preventDefault();

      if (e.target.classList.contains('addMeal')) {
         window.location.href = 'meals.html';
      }
   }

   return {
      startNewSession: function () {
         // Get current user
         let currentUser = mainDataControl.getCurrentUser();

         // Display user dashboard
         sessionUIControl.displayDashboard(currentUser);

         // Load event listeners
         loadEventListeners();
      }
   }
})()