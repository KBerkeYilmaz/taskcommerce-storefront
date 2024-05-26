import React, { Component } from "react";
import { dummyData } from "../server/db/dummy";
import { ShoppingCart as CartIcon } from "lucide-react";
import GridLayout from "../components/GridLayout";
import Carousel from "../components/Carousel";
import { useItemStore, useCartStore } from "../store"; // Adjust the path as necessary
import { withRouter } from "../components/withRouter";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: useItemStore.getState().items, // Initialize items from store
      activeCategory: "",
      cartToggled: useCartStore.getState().cartToggled,
    };
  }

  componentDidMount() {
    // Subscribe to the store
    this.unsubscribeItems = useItemStore.subscribe(
      (state) => this.setState({ items: state.items }), // Correctly update state with items
      (state) => state.items
    );

    this.unsubscribeCart = useCartStore.subscribe(
      (state) => this.setState({ cartToggled: state.cartToggled }), // Correctly update state with cart toggle
      (state) => state.cartToggled
    );

    this.updateActiveLink();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.router.location.search !== prevProps.router.location.search
    ) {
      this.updateActiveLink();
    }
  }

  componentWillUnmount() {
    // Unsubscribe from the stores
    this.unsubscribeItems();
    this.unsubscribeCart();
  }

  handleAddItems = (product) => {
    // Automatically select the first attribute value for each attribute
    const selectedAttributes = product.attributes.reduce((acc, attribute) => {
      acc[attribute.id] = attribute.items[0].value;
      return acc;
    }, {});

    const productWithAttributes = { ...product, selectedAttributes };
    console.log(productWithAttributes);
    useItemStore.getState().addItem(productWithAttributes);
    // useCartStore.getState().toggleCart(); // Open cart after adding item
  };


  updateActiveLink = () => {
    const { location } = this.props.router;
    let activeCategory = "";

    if (location.search === "?=tech") {
      activeCategory = "tech";
    } else if (location.search === "?=clothes") {
      activeCategory = "clothes";
    } else {
      activeCategory = "/";
    }

    this.setState({ activeCategory });
  };

  render() {
    const { cartToggled, items, activeCategory } = this.state;

    return (
      <GridLayout title={"Welcome"}>
        {dummyData.products
          .filter(
            (item) => item.category === activeCategory || activeCategory === "/"
          )
          .map((product) => (
            <div
              className={`p-4 min-h-fit group hover:shadow-2xl transition-shadow duration-300 `}
              key={product.id}
              data-testid={`product-${product.name
                .toLowerCase()
                .replace(/\s/g, "-")}`}
            >
                <Carousel
                  slides={product.gallery}
                  inStock={product.inStock}
                />
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/${product.category}/${product.id}`}
                  className="no-underline"
                >
                  <div>
                    <h2 className="text:lg lg:text-xl">{product.name}</h2>
                    <p className="text-sm">
                      {product.prices[0].amount}
                      {product.prices[0].currency.symbol}
                    </p>
                  </div>
                </Link>

                {product.inStock && (
                  <button
                    className="flex justify-center items-center mt-2 -translate-y-14 -translate-x-6 bg-green-500 text-white px-4 py-4 rounded-full cursor-pointer disabled:bg-green-300 opacity-0 hover:bg-green-600 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.handleAddItems(product);
                    }}
                  >
                    <CartIcon />
                  </button>
                )}
              </div>
            </div>
          ))}
      </GridLayout>
    );
  }
}

export default withRouter(Home);
