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
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookies', calories: 900},
      {id: 2, name: 'Eggs', calories: 300},
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
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
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
  }

  // Add item submit
  const itemAddSubmit = function(e) {

    // Get input from UIController
    const input = UIController.getItemInput();
    
    // Check for name and input values
    if(input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemController.addItem(input.name, input.calories);
    }
    e.preventDefault();
  }

  return {
    init: function() {

      // Fetch Items from data structure
      const items = ItemController.getItems();

      // Populate Items from data structure
      UIController.populateItemList(items);

      // Load Event Listeners
      loadEventListeners();
    }
  }
})(ItemController, UIController);

    // Initialize App
App.init();
