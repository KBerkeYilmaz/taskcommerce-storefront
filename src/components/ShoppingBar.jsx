import React, { Component } from "react";
import { useItemStore } from "../store";

class ShoppingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: useItemStore.getState().items, // Initialize items from store
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.setState({ items: this.props.items });
    }
  }

  handleAddItems = (product) => {
    useItemStore.getState().addItem(product);
  };

  handleRemoveItems = (cartID) => {
    useItemStore.getState().removeItem(cartID);
  };

  render() {
    const { items } = this.state;

    return (
      <div className="absolute top-20 right-0 w-[22rem] h-2/3 bg-white shadow-md z-50 lg:mr-24 px-4 py-6 animate-fadeInFast origin-center">
        <h3 className="text-slate-600 font-bold">
          My Bag:&nbsp;
          <span className="font-semibold text-sm">
            {items && items.length === 1
              ? `Selected Item: ${items.length}`
              : items.length > 1
              ? `Selected Items: ${items.length}`
              : "No Selected Item"}
          </span>
        </h3>
        <div className="h-[60%] w-full overflow-y-scroll my-4 flex flex-col gap-20">
          {items.map((item, index) => (
            <div
              key={item.id + index}
              className="flex justify-between items-stretch"
            >
              <div className="w-1/2 gap-6">
                <h3 className="text-lg">{item.name}</h3>
                <div>
                  <p className="text-sm text-slate-900 font-semibold">
                    {item.prices[0].amount}
                    {item.prices[0].currency.symbol}
                  </p>
                </div>

                {item.attributes.map((attribute) => (
                  <div
                    key={attribute.id}
                    className="flex flex-col"
                  >
                    <h2 className="text-sm text-[#1D1F22]">
                      {attribute.name.slice(0, 1).toUpperCase() +
                        attribute.name.slice(1)}
                      :
                    </h2>
                    <div className="flex gap-1">
                      {attribute.id !== "Color"
                        ? attribute.items.map((attrItem) => (
                            <button
                              key={attrItem.id}
                              className="text-slate-700 text-sm px-1.5 border-2 border-black source-sans-3"
                            >
                              {attrItem.value}
                            </button>
                          ))
                        : attribute.items.map((attrItem) => (
                            <button
                              key={attrItem.id}
                              className="text-slate-700 p-3"
                              style={{ backgroundColor: attrItem.value }}
                              title={attrItem.displayValue}
                            ></button>
                          ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-full flex flex-col justify-between items-start">
                <button
                  className="px-2 border border-black text-center text-2xl"
                  onClick={() => this.handleAddItems(item)}
                >
                  +
                </button>
                <span className="text-center text-xl font-semibold">
                  {item.quantity}
                </span>
                <button
                  className="px-2 border border-black text-center text-2xl"
                  onClick={() => this.handleRemoveItems(item.cartID)}
                >
                  -
                </button>
              </div>

              <div className="w-1/3 h-full">
                <img
                  src={item.gallery[0]}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center w-full">
          <h3 className="text-slate-600 font-bold my-6 font-roboto">Total</h3>
          <span className="font-bold text-sm">
            {items.length > 0 && items[0].prices[0].currency.symbol}
            {parseFloat(
              items
                .reduce((acc, item) => acc + item.prices[0].amount, 0)
                .toFixed(6)
            )}
          </span>
        </div>
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-center rounded text-sm font-semibold disabled:bg-green-300"
          disabled={items.length === 0}
        >
          PLACE ORDER
        </button>
      </div>
    );
  }
}

export default ShoppingBar;
