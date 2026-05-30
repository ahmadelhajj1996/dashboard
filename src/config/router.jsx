import { Routes, Route } from "react-router-dom";
import AuthenticatedLayout from "../layouts/authenticated";
import PublicLayout from "../layouts/public";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Attributes from "../pages/Attributes";
import Attribute from "../pages/Attribute";
import Users from "../pages/Users";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Variation from "../pages/Variation";
import Orders from "../pages/Orders";
import Order from "../pages/Order";
import Login from "../pages/Login";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";


import Test from "../pages/Test";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<AuthenticatedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/attributes" element={<Attributes />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/attributes/:id" element={<Attribute />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products/variations/:id" element={<Variation />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />

        
        <Route path="/test/:id" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
