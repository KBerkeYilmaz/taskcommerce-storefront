import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart as CartIcon,
  AlignJustify as BurgerBtn,
} from "lucide-react";
import { useItemStore, useCartStore } from "../../../store"; // Adjust the path as necessary
import ShoppingBar from "../../../components/ShoppingBar"; // Adjust the path as necessary
import { withRouter } from "../../../components/withRouter";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartState: useCartStore.getState().cartToggled,
      burgerState: false,
      items: useItemStore.getState().items, // Initialize items from store
      activeLink: "",
    };
  }

  componentDidMount() {
    // Subscribe to the store
    this.unsubscribeItems = useItemStore.subscribe(
      (state) => this.setState({ items: state.items }), // Correctly update state with items
      (state) => state.items
    );

    this.unsubscribeCart = useCartStore.subscribe(
      (state) => this.setState({ cartState: state.cartToggled }), // Correctly update state with cart toggle
      (state) => state.cartToggled
    );

    this.updateActiveLink();
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.location.search !== prevProps.router.location.search) {
      this.updateActiveLink();
    }
  }

  componentWillUnmount() {
    // Unsubscribe from the stores
    this.unsubscribeItems();
    this.unsubscribeCart();
  }

  handleClick = () => {
    useCartStore.getState().toggleCart();
  };

  handleBurgerClick = () => {
    this.setState((prevState) => ({ burgerState: !prevState.burgerState }));
  };

  updateActiveLink = () => {
    const { location } = this.props.router;
    let activeLink = "";

    if (location.search === "?=tech") {
      activeLink = "/?=tech";
    } else if (location.search === "?=clothes") {
      activeLink = "/?=clothes";
    } else {
      activeLink = "/";
    }

    this.setState({ activeLink });
  };

  render() {
    const { burgerState, cartState, items, activeLink } = this.state;

    return (
      <nav className="mx-auto px-8 lg:px-32 py-8 grid grid-cols-2 lg:grid-cols-3 h-fit w-full z-50">
        <div className="gap-4 hidden lg:flex">
          <Link
            data-testid={activeLink === "/" ? "active-category-link" : "category-link"}
            to="/"
          >
            Home
          </Link>
          <Link
            data-testid={activeLink === "/?=tech" ? "active-category-link" : "category-link"}
            to="/?=tech"
          >
            Tech
          </Link>
          <Link
            data-testid={activeLink === "/?=clothes" ? "active-category-link" : "category-link"}
            to="/?=clothes"
          >
            Clothes
          </Link>
        </div>
        <button onClick={this.handleBurgerClick} className="block lg:hidden">
          <BurgerBtn size={24} />
        </button>
        <div
          className={`fixed z-50 top-0 left-0 flex flex-col gap-4 bg-white shadow-lg min-h-screen w-64 p-6 max-h-screen transform ${
            burgerState ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl">Main Logo</h1>
            <button
              onClick={this.handleBurgerClick}
              className="text-slate-500 text-xl rounded-full py-2 px-4"
            >
              X
            </button>
          </div>
          <Link
            className="text-lg"
            data-testid={activeLink === "/" ? "active-category-link" : "category-link"}
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-lg"
            data-testid={activeLink === "/?=tech" ? "active-category-link" : "category-link"}
            to="/?=tech"
          >
            Tech
          </Link>
          <Link
            className="text-lg"
            data-testid={activeLink === "/?=clothes" ? "active-category-link" : "category-link"}
            to="/?=clothes"
          >
            Clothes
          </Link>
        </div>

        <div className="hidden lg:flex justify-start lg:justify-center items-center">
          <h1 className="text-2xl font-semibold">Main Logo</h1>
        </div>
        <button data-testid="cart-btn" className="relative flex justify-end items-center" onClick={this.handleClick}>
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

export default withRouter(Navbar);
