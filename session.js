const sessionUIControl = (function () {
   return {
      displayDashboard: function (user) {
         let container = document.getElementById('container');
         let lostGained = '';
         let totalCalories = Math.abs(user.netCalories);
         let mealButton = `                  <button class="accent"><a href="meals.html">See More Meals</a></button>`;
         let workoutButton = `<button class="accent"><a href="workouts.html">See More Workouts</a></button>`;

         if (user.caloriesGained == 0) {
            mealButton = `You don't have any meals yet. <br><br><button class="accent"><a href="meals.html">Add Meal</a></button>`;
         }

         if (user.caloriesLost == 0) {
            workoutButton = `You don't have any workouts yet. <br><br><button class="accent"><a href="workouts.html">Add Workout</a></button>`;
         }

         if (user.netCalories <= 0) {
            lostGained = 'Lost';
         } else if (user.netCalories > 0) {
            lostGained = 'Gained';
         }

         let meals = user.meals;
         let workouts = user.workouts;
         let displayMeals = '';
         let displayWorkouts = '';

         if (meals.length > 3) {
            meals.splice(2, 1);
         }

         if (workouts.length > 3) {
            workouts.splice(2);
         }

         meals.forEach(function(meal) {
            displayMeals += `<li class="collection-item"><strong>${meal.name}</strong> <em class="right">${meal.calories} calories gained</em></li>`
         })

         workouts.forEach(function(workout) {
            displayWorkouts += `<li class="collection-item"><strong>${workout.name}</strong> <em class="right">${workout.calories} calories gained</em></li>`
         })

         if (user.workouts == '' && user.meals == '') {
            container.innerHTML = `
            <div class="m-auto center-text">
            <h1 class="title">Welcome, ${user.name}!</h1>
            <h3 class="subtitle">You're new here.  Start your exercise journey by adding a meal or a workout.</h3>
            <button class="accent"><a href="meals.html">Add Meal</a></button>
            <button class="accent"><a href="workouts.html">Add Workout</a></button>
         </div>
         <div class="row">
            <div class="col mobile-col-12 center-text">
               <div class="dashboard-item">
                  <h2 class="m-0">Total Calories ${lostGained}: ${totalCalories}</h2>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col">
               <div class="dashboard-item center-text full-height">
                  <h4>Calories Gained: ${user.caloriesGained}</h4>
                  <ul class="collection align-text-left">
                     ${displayMeals}
                  </ul>
                  <button class="accent m-0"><a href="meals.html">Add Meal</a></button>
               </div>
            </div>
            <div class="col">
               <div class="dashboard-item center-text full-height">
                  <h4>Calories Lost: ${user.caloriesLost}</h4>
                  <ul class="collection align-text-left">
                     ${displayWorkouts}
                  </ul>
                  <button class="accent m-0"><a href="workouts.html">Add Workout</a></button>
               </div>
            </div>
         </div>
            `
         } else {
            container.innerHTML = `
            <div class="m-auto center-text">
            <h1 class="title">Welcome back, ${user.name}!</h1>
            <h3 class="subtitle">Here's a summary of your calorie activity.</h3>
         </div>
         <div class="row">
            <div class="col mobile-col-12 center-text">
               <div class="dashboard-item">
                  <h2 class="m-0">Total Calories ${lostGained}: ${totalCalories}</h2>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col">
               <div class="dashboard-item center-text full-height">
                  <h4>Calories Gained: ${user.caloriesGained}</h4>
                  <ul class="collection align-text-left">
                     ${displayMeals}
                  </ul>
                  ${mealButton}
               </div>
            </div>
            <div class="col">
               <div class="dashboard-item center-text full-height">
                  <h4>Calories Lost: ${user.caloriesLost}</h4>
                  <ul class="collection align-text-left">
                     ${displayWorkouts}
                  </ul>
                  ${workoutButton}
               </div>
            </div>
         </div>
         `
         }
      }
   }
})()

const sessionControl = (function () {
   return {
      startNewSession: function () {
         // Get current user
         const user = mainDataControl.getCurrentUser();

         // Display user dashboard
         sessionUIControl.displayDashboard(user);

         // Load events
         mainDataControl.loadEventListeners();
      }
   }
})()

sessionControl.startNewSession();
