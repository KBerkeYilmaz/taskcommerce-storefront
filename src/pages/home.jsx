import React, { Component } from "react";
import { dummyData } from "../server/db/dummy";
import { Plus } from "lucide-react";
import GridLayout from "../components/GridLayout";
import Carousel from "../components/Carousel";
import { useItemStore } from "../store"; // Adjust the path as necessary

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: useItemStore.getState().items, // Initialize items from store
    };
  }

  componentDidMount() {
    // Subscribe to the store
    this.unsubscribe = useItemStore.subscribe(
      (items) => this.setState({ items }),
      (state) => state.items
    );
  }

  componentWillUnmount() {
    // Unsubscribe from the store
    this.unsubscribe();
  }

  handleAddItems = (product) => {
    useItemStore.getState().addItem(product);
  };

  render() {
    const { items } = this.state;

    return (
      <GridLayout title={"Welcome"}>
        {dummyData.products.map((product) => (
          <div
            className="border p-4 min-h-fit"
            key={product.id}
          >
            <Carousel
              slides={product.gallery}
              inStock={product.inStock}
            />
            <div className="mt-4 flex justify-between items-center">
              <div>
                <h2 className="text:lg lg:text-xl">{product.name}</h2>
                <p className="text-sm">
                  {product.prices[0].amount}
                  {product.prices[0].currency.symbol}
                </p>
              </div>
              <button
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => this.handleAddItems(product)}
              >
                <Plus />
              </button>
            </div>
          </div>
        ))}
      </GridLayout>
    );
  }
}

export default Home;
