<!DOCTYPE html>
<html lang="en" style="height: 100%;">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Calorie Tracker</title>
   <link rel="stylesheet" href="../Peach CSS/breeze.css">
   <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
      crossorigin="anonymous">
   <style>
      .dashboard-item {
         border-radius: 1px;
         padding: 15px;
         background: #f8f8f8;
         border: 1px solid #eeeeee;
      }

      .collection-item {
         background: white;
      }
   </style>
</head>

<body>
   <nav class="navbar white" style="border-bottom: 2px solid #00c6e0;">
      <div class="navbar-content">
         <div class="navbar-left center-text tablet-text-align-left">
            <h1>CalTrack</h1>
         </div>
         <div class="navbar-right">
            <ul class="menu">
               <li class="menu-item mr-2 addWorkout"><a href="workouts.html"><i class="fas fa-running fa-2x"></i></a></li>
               <li class="menu-item mr-2 addMeal"><a href="meals.html"><i class="fas fa-hamburger fa-2x"></i></a></li>
               <li class="menu-item dashboard"><a href="dashboard.html"><i class="fas fa-th-large fa-2x"></i></a></li>
            </ul>
         </div>
      </div>
   </nav>
   <section>
      <div class="container" id="container">

      </div>
   </section>

   <script src="data.js"></script>
   <script src="session.js"></script>
</body>

</html>