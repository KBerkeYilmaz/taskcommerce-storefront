import React, { Component } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useCartStore } from "../store";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children,
      cartToggled: useCartStore.getState().cartToggled,
    };
  }

  componentDidMount() {
    // Subscribe to the store
    this.unsubscribeCart = useCartStore.subscribe(
      (state) => this.setState({ cartToggled: state.cartToggled }),
      (state) => state.cartToggled
    );
  }

  componentWillUnmount() {
    // Unsubscribe from the stores
    this.unsubscribeCart();
  }

  render() {
    return (
      <div className="w-screen min-h-screen overflow-y-auto overflow-x-hidden text-slate-600 flex flex-col bg-white ">
        <Header />
        <main className="flex-grow">
          {this.props.children}
          {this.state.cartToggled && (
            <div className="fixed inset-0 top-24 bg-black bg-opacity-50"></div>
          )}
        </main>
        <Footer>Scandiweb Test Application</Footer>
      </div>
    );
  }
}
export default Layout;
