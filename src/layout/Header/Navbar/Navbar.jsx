import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart as CartIcon } from "lucide-react";
import { useItemStore } from "../../../store"; // Adjust the path as necessary
import ShoppingBar from "../../../components/ShoppingBar"; // Adjust the path as necessary

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartState: false,
      items: useItemStore.getState().items, // Initialize items from store
    };
  }

  componentDidMount() {
    // Subscribe to the store
    this.unsubscribe = useItemStore.subscribe(
      (state) => this.setState({ items: state.items }), // Correctly update state with items
      (state) => state.items
    );
  }
  componentWillUnmount() {
    // Unsubscribe from the store
    this.unsubscribe();
  }

  handleClick = () => {
    this.setState((prevState) => ({ cartState: !prevState.cartState }));
  };

  render() {
    const { cartState, items } = this.state;
    console.log("Here is the", items);
    return (
      <nav className="mx-auto px-8 lg:px-32 py-8 grid grid-cols-2 lg:grid-cols-3 h-fit w-full">
        <div className="gap-4 hidden lg:flex">
          <Link to="/">Home</Link>
          <Link to="/?=tech">Tech</Link>
          <Link to="/?=clothes">Clothes</Link>
        </div>
        <div className="flex justify-start lg:justify-center items-center">
          Main Logo
        </div>
        <button
          data-testid="cart-btn"
          className="relative flex justify-end items-center"
          onClick={this.handleClick}
        >
          <CartIcon size="24" />

          {items.length > 0 && (
            <span className="text-xs absolute translate-x-2 -translate-y-2 bg-green-500 rounded-full text-white flex items-center justify-center w-6 h-6">
              {items.length}
            </span>
          )}
        </button>
        {cartState && <ShoppingBar items={items} />}
      </nav>
    );
  }
}

export default Navbar;
