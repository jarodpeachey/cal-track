// Storage Controller


// Item Controller
const itemControl = (function () {
   // Item Constructor
   const Item = function (id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
   }

   // Data Structure / State
   const data = {
      items: [],
      currentItem: null,
      totalCalories: 0
   }

   // Public methods
   return {
      getItems: function () {
         return data.items;
      },
      addItem: function (name, calories) {
         let ID;
         // Create ID
         if (data.items.length > 0) {
            ID = data.items[data.items.length - 1].id + 1;
         } else {
            ID = 0;
         }

         // Calories to number
         calories = parseInt(calories);

         // Create new item
         newItem = new Item(ID, name, calories);

         // Add to items array
         data.items.push(newItem);

         return newItem;
      },
      getItemById: function (id) {
         let found = null;
         // Loop throught the items
         data.items.forEach(function(item) {
            if (item.id === id) {
               found = item;
            };
         })

         return found;
      },
      setCurrentItem: function (item) {
         data.currentItem = item;
      },
      getTotalCalories: () => {
         let total = 0;
         data.items.forEach((item) => {
            total += item.calories;
         });

         data.totalCalories = total;
         return data.totalCalories;
      }
   }
})();



// UI Controller
const UIControl = (function () {
   const UISelectors = {
      itemList: '#item-list',
      addBtn: '.add-btn',
      deleteBtn: '.delete-btn',
      updateBtn: '.update-btn',
      backBtn: '.back-btn',
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
           <i class="edit-item fa fa-pencil"></i>
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
         <i class="edit-item fa fa-pencil"></i>
       </a>`;
         // Insert item
         document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
      },
      clearInput: function () {
         document.querySelector(UISelectors.itemNameInput).value = '';
         document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },
      getSelectors: function () {
         return UISelectors;
      },
      displayCalories: function (totalCalories) {
         document.querySelector(UISelectors.caloriesOutput).innerHTML = totalCalories;
      },
      clearEditState: function() {
         UIControl.clearInput();
         document.querySelector(UISelectors.updateBtn).style.display = 'none';
         document.querySelector(UISelectors.deleteBtn).style.display = 'none';
         document.querySelector(UISelectors.backBtn).style.display = 'none';
         document.querySelector(UISelectors.addBtn).style.display = 'inline';
      }
   }
})();



// App Controller
const appControl = (function (itemControl, UIControl) {
   // Load event listeners
   const loadEventListeners = function () {
      // Get UI selectors
      const UISelectors = UIControl.getSelectors();

      // Add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click', addItem);

      // Edit item event
      document.querySelector(UISelectors.itemList).addEventListener('click', editItem);
   }

   // Add item submit
   const addItem = function (e) {
      // Get form input from UI Controller
      const input = UIControl.getItemInput();

      // Check for name and calorie input
      if (input.name !== '' && input.calories !== '') {
         // Add item
         const newItem = itemControl.addItem(input.name, input.calories);

         // Add item to UI list
         UIControl.addListItem(newItem);

         // Get total calories and update
         const totalCalories = itemControl.getTotalCalories();

         // Display calories
         UIControl.displayCalories(totalCalories);

         // Clear fields
         UIControl.clearInput();
      }

      e.preventDefault();
   }

   // Edit and update item
   const editItem = function(e) {
      const target = e.target;
      if (e.target.classList.contains('edit-item')) {
         const listID = e.target.parentNode.parentNode.id;
         const listIDArray = listID.split('-');
         console.log(listIDArray);
         const id = parseInt(listIDArray[1]);

         // Get item
         const itemToEdit = itemControl.getItemById(id);

         // Set current item
         itemControl.setCurrentItem(itemToEdit);
      }
      e.preventDefault();
   }

   // Public methods
   return {
      init: function () {
         // Clear edit state
         UIControl.clearEditState();

         // Fetch items from data structure
         const items = itemControl.getItems();

         // Populate list with items
         UIControl.populateItemList(items);

         // Get total calories and update
         const totalCalories = itemControl.getTotalCalories();

         // Display calories
         UIControl.displayCalories(totalCalories);

         // Load event listeners
         loadEventListeners();
      }
   }

})(itemControl, UIControl);

// Initialize App
appControl.init();