module.exports = {
  // Load Mock Product Data Into localStorage
  init: function () {
    localStorage.clear();
    localStorage.setItem('product', JSON.stringify([
      {
        id: '0011001',
        name: 'Scotch.io Signature Lager',
        image: 'scotch-beer.png',
        description: 'The finest lager money can buy. Hints of keyboard aerosol, with a whiff of iKlear wipes on the nose. If you pass out while drinking this beverage, Chris Sevilleja personally tucks you in.',
        variants: [
          {
            sku: '123123',
            type: '40oz Bottle',
            price: 4.99,
            inventory: 1

          },
          {
            sku: '123124',
            type: '6 Pack',
            price: 12.99,
            inventory: 5
          },
          {
            sku: '1231235',
            type: '30 Pack',
            price: 19.99,
            inventory: 3
          }
        ]
      },
      {
        id: '0011002',
        name: 'Heineken',
        image: 'beer_37.jpg',
        description: 'The finest lager money can buy. Hints of keyboard aerosol, with a whiff of iKlear wipes on the nose. If you pass out while drinking this beverage, Chris Sevilleja personally tucks you in.',
        variants: [
          {
            sku: '123126',
            type: '40oz Bottle',
            price: 5.99,
            inventory: 1

          },
          {
            sku: '123127',
            type: '6 Pack',
            price: 15.99,
            inventory: 5
          },
          {
            sku: '1231238',
            type: '30 Pack',
            price: 22.99,
            inventory: 3
          }
        ]
      }
    ]));
  }

};
