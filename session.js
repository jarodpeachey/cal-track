const sessionUIControl = (function () {
   return {
      displayDashboard: function (currentUser) {
         console.log(currentUser);
         let container = document.getElementById('container');

         container.innerHTML = `
         <div class="row bg-primary">
         <div class="col col-12">
            <div class="center-text p-4">
               <h2 class="m-0">Welcome, ${currentUser.name}! Get started by adding a meal or a workout.</h2>
               <button class="accent mt-2">Add Meal</button>
               <button class="accent">Add Workout</button>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="col mobile-col-12">
            <div class="center-text dashboard-item">
               <h3 class="mb-0">800 Net Calorie Gain</h3>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="col">
            <div class="dashboard-item center-text">
               <h5>1600 calories gained</h5>
               <small>
                  <ul class="collection rounded align-text-left">
                     <li class="collection-item"><strong>Cardio</strong> <em class="right">300 calories gained</em></li>
                     <li class="collection-item"><strong>Dinner</strong> <em class="right">100 calories gained</em></li>
                     <li class="collection-item"><strong>Snack</strong> <em class="right">50 calories gained</em></li>
                  </ul>
                  <button class="small accent">See more meals</button>
               </small>
            </div>
         </div>
         <div class="col">
            <div class="dashboard-item center-text">
               <h5>800 calories lost</h5>
               <small>
                  <ul class="collection rounded align-text-left">
                     <li class="collection-item"><strong>Cardio</strong> <em class="right">300 calories burned</em></li>
                     <li class="collection-item"><strong>Pushups</strong> <em class="right">100 calories burned</em></li>
                     <li class="collection-item"><strong>Run</strong> <em class="right">150 calories burned</em></li>
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

const sessionControl = (function (sessionUIControl) {
   return {
      startNewSession: function (user) {
         // Set current user
         mainDataControl.setCurrentUser(user);

         // Get current user
         const currentUser = mainDataControl.getCurrentUser();

         // Display user dashboard
         sessionUIControl.displayDashboard(currentUser);
      }
   }
})(sessionUIControl)