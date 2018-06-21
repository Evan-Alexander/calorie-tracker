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
    logData: function() {
      return data;
    }
  }
})();
// UI Controller
const UIController = (function() {
  const UISelectors = {
    itemList: '#item-list'
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
    }
  }
})();
// App Controller
const App = (function(ItemController, UIController) {
  return {
    init: function() {
      console.log('Iniitializing App ...');

      // Fetch Items from data structure
      const items = ItemController.getItems();

      // Populate Items from data structure
      UIController.populateItemList(items);
    }
  }
})(ItemController, UIController);

    // Initialize App
App.init();
