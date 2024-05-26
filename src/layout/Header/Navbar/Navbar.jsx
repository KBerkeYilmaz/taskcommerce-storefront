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
      <nav className="mx-auto px-8 lg:px-32 py-8 grid grid-cols-2 lg:grid-cols-3 h-fit w-full z-50 mb-8">
        <div className="gap-4 hidden lg:flex">
          <Link
            data-testid={
              activeLink === "/" ? "active-category-link" : "category-link"
            }
            to="/"
          >
            Home
          </Link>
          <Link
            data-testid={
              activeLink === "/?=tech"
                ? "active-category-link"
                : "category-link"
            }
            to="/?=tech"
          >
            Tech
          </Link>
          <Link
            data-testid={
              activeLink === "/?=clothes"
                ? "active-category-link"
                : "category-link"
            }
            to="/?=clothes"
          >
            Clothes
          </Link>
        </div>
        <button
          onClick={this.handleBurgerClick}
          className="block lg:hidden"
        >
          <BurgerBtn size={24} />
        </button>
        <div
          className={`fixed z-50 top-0 left-0 flex flex-col gap-4 bg-white shadow-lg min-h-screen w-64 p-6 max-h-screen transform ${
            burgerState ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex justify-between items-center w-full">
            <Link
              to={"/"}
              className="text-2xl"
            >
              <svg
                width="33"
                height="31"
                viewBox="0 0 33 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_150_361)">
                  <path
                    d="M30.0222 23.6646C30.0494 23.983 29.8009 24.2566 29.4846 24.2566H3.46924C3.15373 24.2566 2.90553 23.9843 2.93156 23.6665L4.7959 0.912269C4.8191 0.629618 5.05287 0.412109 5.33372 0.412109H27.5426C27.8226 0.412109 28.0561 0.628527 28.0801 0.910361L30.0222 23.6646Z"
                    fill="#1DCF65"
                  />
                  <path
                    d="M32.0988 29.6014C32.1313 29.9985 31.8211 30.339 31.4268 30.339H1.59438C1.2009 30.339 0.890922 30.0002 0.922082 29.6037L3.06376 2.34718C3.09168 1.9927 3.38426 1.71973 3.73606 1.71973H29.1958C29.5468 1.71973 29.8391 1.99161 29.868 2.34499L32.0988 29.6014Z"
                    fill="url(#paint0_linear_150_361)"
                  />
                  <path
                    d="M15.9232 21.6953C12.0402 21.6953 8.88135 17.8631 8.88135 13.1528C8.88135 12.9075 9.07815 12.7085 9.32109 12.7085C9.56403 12.7085 9.76084 12.9073 9.76084 13.1528C9.76084 17.3732 12.5253 20.8067 15.9234 20.8067C19.3214 20.8067 22.0859 17.3732 22.0859 13.1528C22.0859 12.9075 22.2827 12.7085 22.5257 12.7085C22.7686 12.7085 22.9654 12.9073 22.9654 13.1528C22.9653 17.8631 19.8062 21.6953 15.9232 21.6953Z"
                    fill="white"
                  />
                  <path
                    d="M20.2581 13.0337C20.1456 13.0337 20.0331 12.9904 19.9471 12.9036C19.7754 12.7301 19.7754 12.4488 19.9471 12.2753L22.226 9.97292C22.3084 9.88966 22.4203 9.84277 22.5369 9.84277C22.6536 9.84277 22.7654 9.88952 22.8479 9.97292L25.1045 12.2529C25.2762 12.4264 25.2762 12.7077 25.1045 12.8812C24.9327 13.0546 24.6543 13.0547 24.4826 12.8812L22.5368 10.9155L20.569 12.9036C20.4831 12.9904 20.3706 13.0337 20.2581 13.0337Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_150_361"
                    x1="25.8733"
                    y1="26.3337"
                    x2="7.51325"
                    y2="4.9008"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#52D67A" />
                    <stop
                      offset="1"
                      stopColor="#5AEE87"
                    />
                  </linearGradient>
                  <clipPath id="clip0_150_361">
                    <rect
                      width="31.16"
                      height="30.176"
                      fill="white"
                      transform="translate(0.919922 0.412109)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <button
              onClick={this.handleBurgerClick}
              className="text-slate-500 text-xl rounded-full py-2 px-4"
            >
              X
            </button>
          </div>
          <Link
            className="text-lg"
            data-testid={
              activeLink === "/" ? "active-category-link" : "category-link"
            }
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-lg"
            data-testid={
              activeLink === "/?=tech"
                ? "active-category-link"
                : "category-link"
            }
            to="/?=tech"
          >
            Tech
          </Link>
          <Link
            className="text-lg"
            data-testid={
              activeLink === "/?=clothes"
                ? "active-category-link"
                : "category-link"
            }
            to="/?=clothes"
          >
            Clothes
          </Link>
        </div>

        <div className="hidden lg:flex justify-start lg:justify-center items-center">
          <Link
            className="text-2xl font-semibold"
            to={"/"}
          >
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_150_358)">
                <path
                  d="M34.0222 28.6646C34.0494 28.983 33.8009 29.2566 33.4846 29.2566H7.46924C7.15373 29.2566 6.90553 28.9843 6.93156 28.6665L8.7959 5.91227C8.8191 5.62962 9.05287 5.41211 9.33372 5.41211H31.5426C31.8226 5.41211 32.0561 5.62853 32.0801 5.91036L34.0222 28.6646Z"
                  fill="#1DCF65"
                />
                <path
                  d="M36.0988 34.6014C36.1313 34.9985 35.8211 35.339 35.4268 35.339H5.59438C5.2009 35.339 4.89092 35.0002 4.92208 34.6037L7.06376 7.34718C7.09168 6.9927 7.38426 6.71973 7.73606 6.71973H33.1958C33.5468 6.71973 33.8391 6.99161 33.868 7.34499L36.0988 34.6014Z"
                  fill="url(#paint0_linear_150_358)"
                />
                <path
                  d="M19.9232 26.6953C16.0402 26.6953 12.8813 22.8631 12.8813 18.1528C12.8813 17.9075 13.0782 17.7085 13.3211 17.7085C13.564 17.7085 13.7608 17.9073 13.7608 18.1528C13.7608 22.3732 16.5253 25.8067 19.9234 25.8067C23.3214 25.8067 26.0859 22.3732 26.0859 18.1528C26.0859 17.9075 26.2827 17.7085 26.5257 17.7085C26.7686 17.7085 26.9654 17.9073 26.9654 18.1528C26.9653 22.8631 23.8062 26.6953 19.9232 26.6953Z"
                  fill="white"
                />
                <path
                  d="M24.2581 18.0337C24.1456 18.0337 24.0331 17.9904 23.9471 17.9036C23.7754 17.7301 23.7754 17.4488 23.9471 17.2753L26.226 14.9729C26.3084 14.8897 26.4203 14.8428 26.5369 14.8428C26.6536 14.8428 26.7654 14.8895 26.8479 14.9729L29.1045 17.2529C29.2762 17.4264 29.2762 17.7077 29.1045 17.8812C28.9327 18.0546 28.6543 18.0547 28.4826 17.8812L26.5368 15.9155L24.569 17.9036C24.4831 17.9904 24.3706 18.0337 24.2581 18.0337Z"
                  fill="white"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_150_358"
                  x1="29.8733"
                  y1="31.3337"
                  x2="11.5132"
                  y2="9.9008"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#52D67A" />
                  <stop
                    offset="1"
                    stopColor="#5AEE87"
                  />
                </linearGradient>
                <clipPath id="clip0_150_358">
                  <rect
                    width="31.16"
                    height="30.176"
                    fill="white"
                    transform="translate(4.91992 5.41211)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
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

export default withRouter(Navbar);
