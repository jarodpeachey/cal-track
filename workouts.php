<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Calorie Tracker</title>
   <link rel="stylesheet" href="style.css">
   <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
      crossorigin="anonymous">
</head>

<body>
   <nav class="navbar white" style="border-bottom: 2px solid #00c6e0;">
      <div class="navbar-content">
         <div class="navbar-left center-text tablet-text-align-left">
            <h1>CalTrack</h1>
         </div>
         <div class="navbar-right">
            <ul class="menu">
               <li class="menu-item mr-2"><a class="workouts"><i class="fas fa-running fa-2x"></i></a></li>
               <li class="menu-item mr-2"><a class="meals"><i class="fas fa-hamburger fa-2x"></i></a></li>
               <li class="menu-item"><a class="dashboard"><i class="fas fa-th-large fa-2x"></i></a></li>
            </ul>
         </div>
      </div>
   </nav>
   <section>
      <div class="container" style="max-width: 800px; margin: 0 auto;">
         <div class="bg-light">
            <div class="p-3">
               <div id="warning-box" style="color: #ce1c2e;
               background-color: #eebabe; padding: 10px; border-radius: 4px; display: none;"></div>
               <h3>Add Workout</h3>
               <form action="">
                  <div class="row mobile-lg">
                     <div class="col-6 col">
                        <div class="input-element medium">
                           <label for="">Workout Description</label>
                           <input class="full-width" type="text" id="item-name" placeholder="Add item...">
                        </div>
                     </div>
                     <div class="col-6 col">
                        <div class="input-element medium">
                           <label for="">Calories Burned</label>
                           <input class="full-width" type="number" placeholder="Add calories" id="item-calories">
                        </div>
                     </div>
                  </div>

                  <button class="add-btn link"><i class="fa fa-plus"></i> Add Workout</button>
                  <button class="update-btn accent"><i class="fa fa-pencil-square-o"></i> Update Workout</button>
                  <button class="delete-btn danger"><i class="fa fa-remove"></i> Delete Workout</button>
                  <button class="back-btn light float-right"><i class="fa fa-chevron-circle-left"></i> Back</button>
               </form>
            </div>
         </div>
         <h2 class="center-text py-3">Total Calories Burned: <span class="total-calories"></span></h2>

         <ul id="item-list" class="collection">

         </ul>
         <div class="button clear-btn danger float-right mr-0">Clear all</div>
      </div>
   </section>
   <script src="data.js"></script>
   <script src="workouts.js"></script>
</body>

</html>