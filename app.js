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
  
})();
// App Controller
const App = (function(ItemController, UIController) {
  return {
    init: function() {

      // Fetch Items from data structure
      const items = ItemController.getItems();
      
    }
  }
})(ItemController, UIController);

    // Initialize App
App.init();
