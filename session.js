const sessionUIControl = (function () {
   return {
      displayDashboard: function () {
         alert('This works')
         let container = document.getElementById('container');

         container.innerHTML = `
         <div class="row">
         <div class="col col-12">
            <div class="center-text bg-primary p-4">
               <h2 class="m-0">Welcome, Jarod! Get started by adding a meal or a workout.</h2>
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
   const loadEventListeners = function () {

   }

   return {
      startNewSession: function (user) {
         window.location.href = 'session.html';
         
         loadEventListeners();

         console.log(`A new session has been started for ${user.name}`);

         sessionUIControl.displayDashboard();
      }
   }
})(sessionUIControl)