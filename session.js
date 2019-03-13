const sessionUIControl = (function () {
   return {
      displayDashboard: function () {
         let container = document.getElementById('container');
         let user = mainDataControl.getCurrentUser();

         let meals = ``;
         let workouts = ``;

         user.meals.forEach(function (meal) {
            meals += `
               <li class="collection-item"><strong>${meal.name}</strong> <em class="right">${meal.calories} calories gained</em></li>
               `
         })

         user.workouts.forEach(function (workout) {
            workouts += `
               <li class="collection-item"><strong>${workout.name}</strong> <em class="right">${workout.calories} calories gained</em></li>
               `
         })

         if (user.workouts == '' && user.meals == '') {
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
            <div class="center-text dashboard-item my-2">
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
         } else {
            container.innerHTML = `
         <div class="row bg-primary center-text mb-3">
            <div class="col mobile-col-12">
               <h2 class="px-2 m-0">Welcome back!</h2>
               <p class="subtitle mb-2">It's time to get to work!  Here are your meal and workout stats.</p>
               <button class="accent mt-2 addMeal">Add Meal</button>
               <button class="accent addWorkout">Add Workout</button>
            </div>
         </div>
      <div class="row">
         <div class="col mobile-col-12">
            <div class="center-text dashboard-item mb-2">
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
   }
})()

const sessionControl = (function () {
   const loadEventListeners = function () {
      document.addEventListener('click', displayMealPage);
      document.addEventListener('click', displayWorkoutPage);
   }

   const displayMealPage = function (e) {
      e.preventDefault();

      if (e.target.classList.contains('addMeal')) {
         window.location.href = 'meals.html';
      }
   }

   const displayWorkoutPage = function (e) {
      e.preventDefault();

      if (e.target.classList.contains('addWorkout')) {
         window.location.href = 'workouts.html';
      }
   }

   return {
      startNewSession: function (user) {
         // Set current user
         mainDataControl.setCurrentUser(user);

         // Display user dashboard
         sessionUIControl.displayDashboard();

         // Load event listeners
         loadEventListeners();
      }
   }
})()