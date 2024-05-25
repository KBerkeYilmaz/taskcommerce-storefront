import React, { Component } from "react";

class ShoppingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.setState({ items: this.props.items });
    }
  }

  render() {
    const { items } = this.state;

    return (
      <div className="absolute top-16 right-0 w-64 h-2/3 bg-white shadow-md z-50 lg:mr-24 px-4 py-6 animate-fadeInFast origin-center">
        <h3 className="text-slate-600 font-bold">
          My Bag:&nbsp;
          <span className="font-semibold text-sm">
            {(items && items.length === 1 && `Selected Item: ${items.length}`) ||
              (items.length > 1 ? `Selected Items: ${items.length}` : "No Selected Item")}
          </span>
        </h3>
        <div className="h-5/6 w-full overflow-y-scroll my-2">
          {items.map((item, index) => (
            <div key={item.id + index} className="flex justify-between items-center mt-4">
              <div>
                <h3 className="text-lg">{item.name}</h3>
                <p className="text-sm">
                  {item.prices[0].amount}
                  {item.prices[0].currency.symbol}
                </p>
                <span className="flex flex-col">
                  {item.attributes.map((attr, index) => (
                    <span key={attr.id} className="text-xs">
                      {attr.name}: {attr.items.map((item) => item.value).join(", ")}
                    </span>
                  ))}
                </span>
              </div>
              <div>
                <img src={item.gallery[0]} alt={item.name} className="w-16 h-16 object-contain" />
              </div>
            </div>
          ))}
        </div>
        <button className="w-full bg-green-500 text-white py-4 text-center rounded-lg">
          Place Order
        </button>
      </div>
    );
  }
}

export default ShoppingBar;
