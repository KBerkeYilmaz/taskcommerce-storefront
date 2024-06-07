import React, { Component } from "react";
import { withRouter } from "../components/withRouter";
import { dummyData } from "../server/db/dummy";
import BigCarousel from "../components/BigCarousel";
import { Interweave, Markup } from "interweave";
import { useItemStore } from "../store";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      currentSlide: 0,
      items: useItemStore.getState().items,
      selectedAttributes: {},
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.router.params.category !== this.props.router.params.category ||
      prevProps.router.params.id !== this.props.router.params.id
    ) {
      this.fetchProduct();
    }
  }

  fetchProduct = () => {
    const { category, id } = this.props.router.params;
    const product = dummyData.products.find(
      (item) => item.category === category && item.id === id
    );
    this.setState({ product });
  };

  handleAttributeSelect = (attributeId, value) => {
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        [attributeId]: value,
      },
    }));
  };

  handleAddItems = (product) => {
    const { selectedAttributes } = this.state;

    const productWithAttributes = { ...product, selectedAttributes };

    useItemStore.getState().addItem(productWithAttributes);
    // useCartStore.getState().toggleCart();
  };

  areAllAttributesSelected = () => {
    const { product, selectedAttributes } = this.state;
    if (!product || !product.attributes) return false;
    return product.attributes.every(
      (attribute) => selectedAttributes[attribute.id]
    );
  };

  render() {
    const { product, currentSlide, selectedAttributes } = this.state;

    if (!product) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <h1>Product not found</h1>
        </div>
      );
    }

    const allAttributesSelected = this.areAllAttributesSelected();

    return (
      <div className="w-full h-full mx-auto px-8 lg:px-32 flex">
        <div className="flex flex-col">
          {product.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="product"
              className="w-20 h-20 object-contain mb-2 cursor-pointer"
              onClick={() => this.setState({ currentSlide: index })}
            />
          ))}
        </div>
        <div className="mx-4 w-3/4 max-h-screen">
          <BigCarousel
            slides={product.gallery}
            currentSlide={currentSlide}
          />
        </div>
        <div className="flex flex-col w-80 gap-4">
          <h1 className="text-3xl font-semibold text-slate-700">
            {product.name}
          </h1>
          {product.attributes.map((attribute) => (
            <div
              key={attribute.id}
              className="flex flex-col"
            >
              <h2 className="text-lg font-bold text-[#1D1F22] roboto-condensed">
                {attribute.name.toUpperCase()}:
              </h2>
              <div className="flex gap-4">
                {attribute.id !== "Color"
                  ? attribute.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`text-slate-700 px-5 py-2 border-2 cursor-pointer ${
                          selectedAttributes[attribute.id] === item.value
                            ? "bg-black text-white"
                            : "border-black"
                        }`}
                        onClick={() =>
                          this.handleAttributeSelect(attribute.id, item.value)
                        }
                      >
                        {item.value}
                      </button>
                    ))
                  : attribute.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`text-slate-700 px-4 py-4 cursor-pointer ${
                          selectedAttributes[attribute.id] === item.value
                            ? "ring-2 ring-green-500 ring-offset-1"
                            : ""
                        }`}
                        style={{ backgroundColor: item.value }}
                        title={item.displayValue}
                        onClick={() =>
                          this.handleAttributeSelect(attribute.id, item.value)
                        }
                      ></button>
                    ))}
              </div>
            </div>
          ))}
          <div>
            <h3 className="font-bold text-lg text-[#1D1F22] roboto-condensed">
              {product.prices[0].__typename.toUpperCase()}:
            </h3>
            <p className=" text-slate-700 raleway-semibold">
              {product.prices[0].amount}
              {product.prices[0].currency.symbol}
            </p>
          </div>

          <button
            className="w-full bg-green-500 text-white py-4 text-center hover:bg-green-600 disabled:bg-green-300"
            disabled={!product.inStock || !allAttributesSelected}
            onClick={() => this.handleAddItems(product)}
          >
            ADD TO CART
          </button>
          <Markup
            content={product.description}
            className="text-sm roboto-regular tracking-wider"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetail);
