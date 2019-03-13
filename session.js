const sessionUIControl = (function () {
   return {
      displayDashboard: function (user) {
         let container = document.getElementById('container');
         let lostGained = '';
         let totalCalories = Math.abs(user.netCalories);
         let mealButton = `<button class="accent addMeal m-0">See more workouts</button>`;
         let workoutButton = `<button class="accent addWorkout m-0">See more workouts</button>`;

         if (user.caloriesGained == 0) {
            mealButton = `You don't have any meals yet. <br><br><button class="accent addMeal m-0">Add a meal</button>`;
         }

         if (user.caloriesLost == 0) {
            workoutButton = `You don't have any workouts yet. <br><br><button class="accent addMeal m-0">Add a workout</button>`;
         }

         if (user.netCalories <= 0) {
            lostGained = 'Lost';
         } else if (user.netCalories > 0) {
            lostGained = 'Gained';
         }

         let meals = [];
         let workouts = [];

         user.meals.forEach(function (meal) {
            meals.push(`
               <li class="collection-item"><strong>${meal.name}</strong> <em class="right">${meal.calories} calories gained</em></li>
               `); 
         })

         if (meals.length > 3) {
            meals.splice(3);
         }

         user.workouts.forEach(function (meal) {
            workouts.push(`
               <li class="collection-item"><strong>${meal.name}</strong> <em class="right">${meal.calories} calories gained</em></li>
               `); 
         })

         if (workouts.length > 3) {
            workouts.splice(3);
         }

         if (user.workouts == '' && user.meals == '') {
            container.innerHTML = `
            <div class="m-auto center-text">
            <h1 class="title">Welcome, ${user.name}!</h1>
            <h3 class="subtitle">You're new here.  Start your exercise journey by adding a meal or a workout.</h3>
            <button class="accent addMeal">Add Meal</button>
            <button class="accent addWorkout m-0">Add Workout</button>
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
               <div class="dashboard-item center-text">
                  <h4>Calories Gained: ${user.caloriesGained}</h4>
                  <ul class="collection align-text-left">
                     ${meals}
                  </ul>
                  <button class="accent addMeal m-0">See more meals</button>
               </div>
            </div>
            <div class="col">
               <div class="dashboard-item center-text">
                  <h4>Calories Lost: ${user.caloriesLost}</h4>
                  <ul class="collection align-text-left">
                     ${workouts}
                  </ul>
                  <button class="accent addMeal m-0">See more workouts</button>
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
               <div class="dashboard-item center-text">
                  <h4>Calories Gained: ${user.caloriesGained}</h4>
                  <ul class="collection align-text-left">
                     ${meals}
                  </ul>
                  ${mealButton}

               </div>
            </div>
            <div class="col">
               <div class="dashboard-item center-text">
                  <h4>Calories Lost: ${user.caloriesLost}</h4>
                  <ul class="collection align-text-left">
                     ${workouts}
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

         // Load event listeners
         loadEventListeners();
      }
   }
})()

sessionControl.startNewSession();
