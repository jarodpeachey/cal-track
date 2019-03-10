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
         data.items.forEach(function (item) {
            if (item.id === id) {
               found = item;
            };
         })

         return found;
      },
      updateItem: function (name, calories) {
         calories = parseInt(calories);

         let found = null;

         data.items.forEach(function (item) {
            if (item.id === data.currentItem.id) {
               item.name = name;
               item.calories = calories;
               found = item;
            }
         });

         return found;
      },
      deleteItem: function (id) {
         // const ids = data.items.map(function(item) {
         //    return item.id;
         // });
         let itemToDelete = '';

         data.items.forEach(function (item, index) {
            if (item.id == id) {
               itemToDelete = data.items[index];
               data.items.splice(index, 1);
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
      addCurrentItemToForm: function (item) {
         document.querySelector(UISelectors.itemNameInput).value = item.name;
         document.querySelector(UISelectors.itemCaloriesInput).value = item.calories;
         UIControl.showEditState();
      },
      updateItem: function (item) {
         const oldItem = document.querySelector(`#item-${item.id}`);

         oldItem.outerHTML =
            `<li class="collection-item" id="item-${item.id}">
         <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
         <a href="#" class="right">
           <i class="edit-item fa fa-pencil"></i>
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
         UIControl.clearEditState();
      },
      deleteAllItems: function () {
         const UIlist = document.querySelector(UISelectors.itemList);

         for (i = 0; i < UIlist.children.length; i++) {
            UIlist.children[i].remove();
         }
      },
      getSelectors: function () {
         return UISelectors;
      },
      displayCalories: function (totalCalories) {
         document.querySelector(UISelectors.caloriesOutput).innerHTML = totalCalories;
      },
      clearEditState: function () {
         UIControl.clearInput();
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
const appControl = (function (itemControl, UIControl) {
   // Load event listeners
   const loadEventListeners = function () {
      // Get UI selectors
      const UISelectors = UIControl.getSelectors();

      // Add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click', addItem);

      // Edit item event
      document.querySelector(UISelectors.itemList).addEventListener('click', editItem);

      document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItem);

      document.querySelector(UISelectors.backBtn).addEventListener('click', backButtonFunc);

      document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItem);

      document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);
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
   const editItem = function (e) {
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

   // Update function
   const updateItem = function (e) {
      // Get the new inputs
      const input = UIControl.getItemInput();

      // Add updated item class
      const updatedItem = itemControl.updateItem(input.name, input.calories);

      // Update item in UI
      UIControl.updateItem(updatedItem);

      // Update calories
      const updatedCalories = itemControl.getTotalCalories();

      UIControl.displayCalories(updatedCalories);

      // Clear input fields
      UIControl.clearInput();

      // Clear edit state buttons
      UIControl.clearEditState();

      e.preventDefault();
   }

   // Back button / clear edit state
   const backButtonFunc = function (e) {
      e.preventDefault();

      // Clear edit state
      UIControl.clearEditState();
   }

   const deleteItem = function (e) {
      // Get current item
      const currentItem = itemControl.getCurrentItem();

      // Delete from data structure
      const itemToDelete = itemControl.deleteItem(currentItem.id);

      // Delete from UI
      UIControl.deleteItem(itemToDelete);

      // Update calories
      const updatedCalories = itemControl.getTotalCalories();

      UIControl.displayCalories(updatedCalories);

      e.preventDefault();
   }

   const clearAllItems = function (e) {
      // Delete from data
      itemControl.deleteAllItems();

      // Delete from UI
      UIControl.deleteAllItems();

      // Update calories
      const updatedCalories = itemControl.getTotalCalories();

      UIControl.displayCalories(updatedCalories);

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