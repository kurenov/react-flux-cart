var React = require('react');
var FluxCartActions = require('../actions/FluxCartActions');
var _ = require('underscore');

// Flux product view
var FluxProduct = React.createClass({

  // Add item to cart via Actions
  addToCart: function (product) {
    var selected = product.selected || product.variants[0];
    console.log(selected);
    var update = {
      name: product.name,
      type: selected.type,
      price: selected.price
    };
    selected.inventory--;
    FluxCartActions.addToCart(selected.sku, update);
    FluxCartActions.updateCartVisible(true);
  },

  // Select product variation via Actions
  selectVariant: function (item, event) {
    item.selected = item.variants[event.target.value];
    console.log('item.selected',item.selected);
    FluxCartActions.selectProduct(event.target.value);
  },

  // Render product View
  render: function () {
    var self = this;
    var ats = (this.props.selected.sku in this.props.cartitems) ?
    this.props.selected.inventory - this.props.cartitems[this.props.selected.sku].quantity :
      this.props.selected.inventory;
      //console.log('this.props',this.props);
    var renderedProducts = _(this.props.products).map(function (item) {

      //select 1st variant by default
      if (!item.selected) {
        item.selected = item.variants[0];
      }

      return <div className="flux-product" key={item.id}>
        <div className="flux-product-image-box">
          <img src={'img/' + item.image}/>
        </div>

        <div className="flux-product-detail">
          <h1 className="name">{item.name} - {item.selected.inventory}</h1>

          <p className="description">{item.description}</p>

          <p className="price">Price: ${item.selected.price}</p>
          <select onChange={self.selectVariant.bind(self, item)} ref={item.id} >
            {item.variants.map(function (variant, index) {
              return (
                <option key={index} value={index}>{variant.type}</option>
              )
            })}
          </select>
          <button type="button" onClick={self.addToCart.bind(self, item)} disabled={item.selected.inventory > 0 ? '' : 'disabled'}>
            {item.selected.inventory ? 'Add To Cart' : 'Sold Out'}
          </button>
        </div>
      </div>;
    });
    return (
      <div>
        {renderedProducts}
      </div>
    );
  }

});

module.exports = FluxProduct;
