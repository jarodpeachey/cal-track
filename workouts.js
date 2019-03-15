// Item Controller
const workoutItemControl = (function () {
   // Item Constructor
   const Workout = function (id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
   }

   // Data Structure / State
   const data = {
      currentItem: null
   }

   // Public methods
   return {
      getItems: function () {
         let items = mainDataControl.getCurrentUser().workouts;
         return items;
      },
      addItem: function (name, calories) {
         let items = mainDataControl.getCurrentUser().workouts;

         let ID;
         // Create ID
         if (items.length > 0) {
            ID = items[items.length - 1].id + 1;
         } else {
            ID = 0;
         }

         // Calories to number
         calories = parseInt(calories);

         // Create new item
         newItem = new Workout(ID, name, calories);

         return newItem;
      },
      getItemById: function (id) {
         let items = mainDataControl.getCurrentUser().workouts;
         let found = null;
         // Loop throught the items
         items.forEach(function (item) {
            if (item.id === id) {
               found = item;
            };
         })

         return found;
      },
      updateItem: function (name, calories) {
         let items = mainDataControl.getCurrentUser().workouts;
         calories = parseInt(calories);

         let found = null;

         items.forEach(function (item) {
            if (item.id === data.currentItem.id) {
               item.name = name;
               item.calories = calories;
               found = item;
            }
         });

         return found;
      },
      deleteItem: function (id) {
         let itemToDelete = '';

         let items = mainDataControl.getCurrentUser().workouts;

         items.forEach(function (item, index) {
            if (item.id == id) {
               itemToDelete = items[index];
            }
         })

         return itemToDelete;
      },
      deleteAllItems: async function () {
         if (confirm('Are you sure you want to delete all items?')) {
            data.items.splice(0);
         }

         await console.log(data.items);
      },
      setCurrentItem: function (item) {
         data.currentItem = item;
         console.log(data.currentItem);
      },
      getCurrentItem: function () {
         return data.currentItem;
      }
   }
})();



// UI Controller
const workoutUIControl = (function () {
   const UISelectors = {
      itemList: '#item-list',
      addBtn: '.add-btn',
      deleteBtn: '.delete-btn',
      updateBtn: '.update-btn',
      backBtn: '.back-btn',
      clearBtn: '.clear-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      caloriesOutput: '.total-calories'
   }

   // Public methods
   return {
      populateItemList: function (items) {
         let html = '';

         items.forEach(function (item) {
            html += `<li class="collection-item" id="item-${item.id}">
         <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
         <a href="#" class="right">
         <i class="edit-item fas fa-pencil-alt"></i>
         </a>
       </li>`;
         });

         // Insert list items
         document.querySelector(UISelectors.itemList).innerHTML = html;
      },
      getItemInput: function () {
         return {
            name: document.querySelector(UISelectors.itemNameInput).value,
            calories: document.querySelector(UISelectors.itemCaloriesInput).value
         }
      },
      addListItem: function (item) {
         // Show the list
         document.querySelector(UISelectors.itemList).style.display = 'block';
         // Create li element
         const li = document.createElement('li');
         // Add class
         li.className = 'collection-item';
         // Add ID
         li.id = `item-${item.id}`;
         // Add HTML
         li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
         <a href="#" class="right">
         <i class="edit-item fas fa-pencil-alt"></i>
         </a>`;
         // Insert item
         document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
      },
      clearInput: function () {
         document.querySelector(UISelectors.itemNameInput).value = '';
         document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },
      addCurrentItemToForm: function (item) {
         document.querySelector(UISelectors.itemNameInput).value = item.name;
         document.querySelector(UISelectors.itemCaloriesInput).value = item.calories;
         workoutUIControl.showEditState();
      },
      updateItem: function (item) {
         const oldItem = document.querySelector(`#item-${item.id}`);

         oldItem.outerHTML =
            `<li class="collection-item" id="item-${item.id}">
         <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
         <a href="#" class="right">
         <i class="edit-item fas fa-pencil-alt"></i>
         </a>
       </li>`;
      },
      deleteItem: function (item) {
         // Get UI item to delete
         const UIItem = document.querySelector(`#item-${item.id}`);

         // Confirm delete from user
         if (confirm(`Are you sure you want to delete the item ${item.name}?`)) {
            UIItem.remove();

            document.getElementById('warning-box').style.display = 'block';
            document.getElementById('warning-box').innerHTML = 'Item was succesfully deleted';

            setTimeout(function () {
               document.getElementById('warning-box').style.display = 'none';
               document.getElementById('warning-box').innerHTML = '';
            }, 2000);
         }

         // Clear edit state
         workoutUIControl.clearEditState();
      },
      getSelectors: function () {
         return UISelectors;
      },
      displayCalories: function (totalCalories) {
         document.querySelector(UISelectors.caloriesOutput).innerHTML = totalCalories;
      },
      clearEditState: function () {
         workoutUIControl.clearInput();
         document.querySelector(UISelectors.updateBtn).style.display = 'none';
         document.querySelector(UISelectors.deleteBtn).style.display = 'none';
         document.querySelector(UISelectors.backBtn).style.display = 'none';
         document.querySelector(UISelectors.addBtn).style.display = 'inline';
      },
      showEditState: function () {
         document.querySelector(UISelectors.updateBtn).style.display = 'inline';
         document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
         document.querySelector(UISelectors.backBtn).style.display = 'inline';
         document.querySelector(UISelectors.addBtn).style.display = 'none';
      }
   }
})();



// App Controller
const appControl = (function (workoutItemControl, workoutUIControl, mainDataControl) {
   // Load event listeners
   const loadEventListeners = function () {
      document.addEventListener('keypress', function (e) {
         if (e.keycode === 13 || e.which === 13) {
            e.preventDefault();
            return false;
         }
      });

      // Get UI selectors
      const UISelectors = workoutUIControl.getSelectors();

      // Add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click', addItem);

      // Edit item event
      document.addEventListener('click', editItem);

      document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItem);

      document.querySelector(UISelectors.backBtn).addEventListener('click', backButtonFunc);

      document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItem);

      document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);

      document.querySelector('.workouts').addEventListener('click', function (e) {
         window.location.href = 'workouts.html';
         e.preventDefault();
      })

      document.querySelector('.meals').addEventListener('click', function (e) {
         window.location.href = 'meals.html';
         e.preventDefault();
      })

      document.querySelector('.dashboard').addEventListener('click', function (e) {
         window.location.href = 'dashboard.html';
         e.preventDefault();
      })
   }

   // Add item submit
   const addItem = function (e) {
      // Get form input from UI Controller
      const input = workoutUIControl.getItemInput();

      // Check for name and calorie input
      if (input.name !== '' && input.calories !== '') {
         // Add item
         const newItem = workoutItemControl.addItem(input.name, input.calories);

         // Update main user data structure
         mainDataControl.updateUserWorkouts(newItem);

         // Update calories data structure
         mainDataControl.updateUserCalories();

         // Get total calories and update
         const totalCalories = mainDataControl.getCaloriesLost();

         // Display calories
         workoutUIControl.displayCalories(totalCalories);

         // Add item to UI list
         workoutUIControl.addListItem(newItem);

         // Clear fields
         workoutUIControl.clearInput();
      }

      e.preventDefault();
   }

   // Edit and update item
   const editItem = function (e) {
      if (e.target.classList.contains('edit-item')) {
         const listID = e.target.parentNode.parentNode.id;
         const listIDArray = listID.split('-');
         const id = parseInt(listIDArray[1]);

         // Get item
         const itemToEdit = workoutItemControl.getItemById(id);

         console.log('Item to edit:', itemToEdit);

         // Set current item
         workoutItemControl.setCurrentItem(itemToEdit);

         // Add item to form
         workoutUIControl.addCurrentItemToForm(workoutItemControl.getCurrentItem());
      }
      e.preventDefault();
   }

   // Update function
   const updateItem = function (e) {
      // Get the new inputs
      const input = workoutUIControl.getItemInput();

      // Add updated item class
      const updatedItem = workoutItemControl.updateItem(input.name, input.calories);

      // Update main user data structure
      mainDataControl.updateWorkout(updatedItem);

      // Update calories data structure
      mainDataControl.updateUserCalories();

      // Get total calories and update
      const totalCalories = mainDataControl.getCaloriesLost();

      // Display calories
      workoutUIControl.displayCalories(totalCalories);

      // Update item in UI
      workoutUIControl.updateItem(updatedItem);

      // Clear input fields
      workoutUIControl.clearInput();

      // Clear edit state buttons
      workoutUIControl.clearEditState();

      e.preventDefault();
   }

   // Back button / clear edit state
   const backButtonFunc = function (e) {
      e.preventDefault();

      // Clear edit state
      workoutUIControl.clearEditState();
   }

   const deleteItem = function (e) {
      // Get current item
      const currentItem = workoutItemControl.getCurrentItem();

      // Delete from data structure
      const itemToDelete = workoutItemControl.deleteItem(currentItem.id);

      console.log(itemToDelete);

      // Delete from data structure
      mainDataControl.deleteWorkout(itemToDelete);

      // Delete from UI
      workoutUIControl.deleteItem(itemToDelete);

      // Update calories data structure
      mainDataControl.updateUserCalories();

      // Get total calories and update
      const totalCalories = mainDataControl.getCaloriesGained();

      // Display calories
      workoutUIControl.displayCalories(totalCalories);

      e.preventDefault();
   }

   const clearAllItems = function (e) {
      if (confirm('Are you sure you want to delete all items?')) {
         // Delete from data
         mainDataControl.deleteAllWorkouts();

         // UI Control delete
         workoutUIControl.deleteAllItems();

         // Update calories data structure
         mainDataControl.updateUserCalories();

         // Get total calories and update
         const totalCalories = mainDataControl.getCaloriesLost();

         // Display calories
         workoutUIControl.displayCalories(totalCalories);
      }

      e.preventDefault();
   }

   // Public methods
   return {
      init: function () {
         // Clear edit state
         workoutUIControl.clearEditState();

         // Fetch items from data structure
         const items = workoutItemControl.getItems();

         // Populate list with items
         workoutUIControl.populateItemList(items);

         // Get total calories and update
         const totalCalories = mainDataControl.getCaloriesLost();

         // Display calories
         workoutUIControl.displayCalories(totalCalories);

         // Load event listeners
         loadEventListeners();

         // Load events for logout
         mainDataControl.loadEventListeners();
      }
   }

})(workoutItemControl, workoutUIControl, mainDataControl);

// Initialize App
appControl.init();