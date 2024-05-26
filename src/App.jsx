import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./error-page";
import Layout from "./layout/Layout";
import Home from "./pages/home";
import ProductDetail from "./pages/product-detail";
import { dummyData } from "./server/db/dummy";

function App() {
  return (
    <Router
      path="/*"
      errorElement={<ErrorPage />}
    >
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          {dummyData.products.map((product) => (
            <Route
              key={product.id}
              path="/:category/:id"
              element={<ProductDetail />}
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
