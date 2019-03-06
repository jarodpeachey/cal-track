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
      updateItem: function (item, name, calories) {
         calories = parseInt(calories);
         item.name = name;
         item.calories = calories;
         UIControl.updateListItem(item);
      },
      setCurrentItem: function (item) {
         data.currentItem = item;
      },
      getCurrentItem: function () {
         return data.currentItem;
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
      updateListItem: function (item) {
         const ID = item.id;
         const oldItem = document.querySelector(`#item-${ID}`);

         oldItem.outerHTML = 
         `<li class="collection-item" id="item-${item.id}">
         <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
         <a href="#" class="right">
           <i class="edit-item fa fa-pencil"></i>
         </a>
       </li>`

         console.log(oldItem);
      },
      clearInput: function () {
         document.querySelector(UISelectors.itemNameInput).value = '';
         document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },
      addCurrentItemToForm: function (item) {
         console.log(item.name);
         document.querySelector(UISelectors.itemNameInput).value = item.name;
         document.querySelector(UISelectors.itemCaloriesInput).value = item.calories;
         UIControl.showEditState();
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
      },
      showEditState: function() {
         document.querySelector(UISelectors.updateBtn).style.display = 'inline';
         document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
         document.querySelector(UISelectors.backBtn).style.display = 'inline';
         document.querySelector(UISelectors.addBtn).style.display = 'none';
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

      // Disable submit on enter
      document.addEventListener('keypress', function(e) {
         if(e.keyCode === 13 || e.which === 13) {
            e.preventDefault();
            return false;
         }
      })

      // Edit item event
      document.querySelector(UISelectors.itemList).addEventListener('click', editItem);

      // Update item event
      document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItem);
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
      if (e.target.classList.contains('edit-item')) {
         const listID = e.target.parentNode.parentNode.id;
         const listIDArray = listID.split('-');
         const id = parseInt(listIDArray[1]);

         // Get item
         const itemToEdit = itemControl.getItemById(id);

         // Set current item
         itemControl.setCurrentItem(itemToEdit);

         // Add item to form
         UIControl.addCurrentItemToForm(itemControl.getCurrentItem());
      }
      e.preventDefault();
   }

   const updateItem = function(e) {
      const currentItemEdit = itemControl.getCurrentItem();
      const itemInput = UIControl.getItemInput();

      /* const updatedItem = */ itemControl.updateItem(currentItemEdit, itemInput.name, itemInput.calories);

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