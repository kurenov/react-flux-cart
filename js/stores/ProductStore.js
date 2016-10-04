var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('underscore');

// Define initial data points
var _products = [], _selected = null;

// Method to load product data from mock API
function loadProductData(data) {
  console.log('data', data);
  _products = data;
  _selected = data[0].variants[0];
}

function restoreProductQuantity(sku, quantity) {
  if (sku && quantity > 0) {
    for (var i in _products) {
      var product = _products[i];
      if (product.variants && product.variants.length) {
        for (var j in product.variants) {
          var variant = product.variants[j];
          if (variant.sku == sku) {
            variant.inventory += quantity;
          }
        }
      }
    }
  }
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var ProductStore = _.extend({}, EventEmitter.prototype, {
  // Return Product data
  getProducts: function () {
    return _products;
  },
  // Return selected Product
  getSelected: function () {
    return _selected;
  },
  // Emit Change event
  emitChange: function () {
    this.emit('change');
  },
  // Add change listener
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  // Remove change listener
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  }
});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
  var action = payload.action;
  var text;
  switch (action.actionType) {
    // Respond to RECEIVE_DATA action
    case FluxCartConstants.RECEIVE_DATA:
      loadProductData(action.data);
      break;
    // Respond to SELECT_PRODUCT action
    case FluxCartConstants.SELECT_PRODUCT:
      //just update products
      break;
    case FluxCartConstants.CART_REMOVE:
      restoreProductQuantity(action.sku, action.quantity);
      break;
    default:
      return true;
  }
  // If action was responded to, emit change event
  ProductStore.emitChange();
  return true;
});

module.exports = ProductStore;
