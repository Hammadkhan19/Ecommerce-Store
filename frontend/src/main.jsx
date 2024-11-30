import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import "./index.css";
import Navbar from "./components/Nav";
import Newsletter from "./components/HomeComponets/NewsLetter";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Signup from "./components/userRegister/Signup";
import Login from "./components/userRegister/Login";
import ProductDetails from "./pages/ProductDetails";
import { AuthContextProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";
import { NextUIProvider } from "@nextui-org/react";
import { CartProvider } from "./context/CartContext";
import ProductCatogory from "./pages/ProductCatogory";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands";
const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/products" element={<ProductCatogory />} />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route path="/brands" element={<Brands />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <NextUIProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </NextUIProvider>
  </CartProvider>
);
