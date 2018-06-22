// Storage Controller

// Item Controller
const ItemController = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure
  const data = {
    items: [
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookies', calories: 900},
      // {id: 2, name: 'Eggs', calories: 300},
    ],
    currentItem: null,
    totalCalories: 0
  }

  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Calories to number
      calories = parseInt(calories);

      // Create new instance
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      data.items.forEach(function(item) {
        if(item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories) {
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(function(item) {
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    clearAllItems: function() {
      data.items = [];
    },
    deleteItem: function(id) {
      // Get ids
      const ids = data.items.map(function(item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;

      data.items.forEach(function(item) {
        total += item.calories;
      });

      // Set total calories in data structure
      data.totalCalories = total;

      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  }
})();
// UI Controller
const UIController = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }
  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(function(item) {
        html += `
        <li class="collection-item" id="${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>        
        `;
      });

      // Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add Class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      li.innerHTML  = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;
      // Insert Item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item) {

      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');
        if(itemID ===  `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemController.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.getCurrentItem().calories;
      UIController.showEditState();
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn Node list into array
      listItems = Array.from(listItems);
      
      listItems.forEach(function(item) {
        item.remove();
      });
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function() {
      UIController.clearInput();
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
    },
    // Make UI Selectors public
    getSelectors: function() {
      return UISelectors;
    }
  }
})();
// App Controller
const App = (function(ItemController, UIController) {

  // Load Event Listeners
  const loadEventListeners = function() {

    // Get UI Selectors
    const UISelectors = UIController.getSelectors();

    // Add Item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable 'enter' button - mostly for preventing dbl entries while editing items
    document.addEventListener('keypress', function(e) {
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon Click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Update item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Clear current item state event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UIController.clearEditState);

    // Clear all items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  // Add item submit
  const itemAddSubmit = function(e) {

    // Get input from UIController
    const input = UIController.getItemInput();
    
    // Check for name and input values
    if(input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemController.addItem(input.name, input.calories);

      // Add item to UI list
      UIController.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemController.getTotalCalories();

      UIController.showTotalCalories(totalCalories);

      // Clear fields
      UIController.clearInput();
    }
    e.preventDefault();
  }

  // Click Item to edit
  const itemEditClick = function(e) {
    if(e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get Item
      const itemToEdit = ItemController.getItemById(id);

      // Set Current Item
      ItemController.setCurrentItem(itemToEdit);
      console.log(itemToEdit);

      // Add item to form
      UIController.addItemToForm();
    }
    e.preventDefault();
  }

  // Update item submit
  const itemUpdateSubmit = function(e) {

    // Get Item input
    const input = UIController.getItemInput();

    // Update item
    const updatedItem = ItemController.updateItem(input.name, input.calories);

    // Update UI
    UIController.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemController.getTotalCalories();

    UIController.showTotalCalories(totalCalories);

    UIController.clearEditState();

    e.preventDefault();
  }

  // Delete button event
  const itemDeleteSubmit = function(e) {
    // Get current item
    const currentItem = ItemController.getCurrentItem();

    // Delete from data structure
    ItemController.deleteItem(currentItem.id);

    // Delete from UI
    UIController.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemController.getTotalCalories();

    UIController.showTotalCalories(totalCalories);

    UIController.clearEditState();

    e.preventDefault();
  }

  // Clear All Items
  const clearAllItemsClick = function() {
    // Delete all items from data structure
    ItemController.clearAllItems();

    // Get total calories
    const totalCalories = ItemController.getTotalCalories();

    UIController.showTotalCalories(totalCalories);

    // Remove from UI
    UIController.removeItems();

    // Hide UL
    UIController.hideList();
  }

  return {
    init: function() {
      // Clear edit state / set initial state
      UIController.clearEditState();

      // Fetch Items from data structure
      const items = ItemController.getItems();

      // Check for items
      if(items.length === 0) {
        UIController.hideList();
      } else {
        // Populate Items from data structure
        UIController.populateItemList(items);
      } 

      // Get total calories
      const totalCalories = ItemController.getTotalCalories();

      UIController.showTotalCalories(totalCalories);

      // Load Event Listeners
      loadEventListeners();
    }
  }
})(ItemController, UIController);

    // Initialize App
App.init();
