import { Routes, Route } from "react-router-dom";
import AuthenticatedLayout from '../layouts/authenticated';
import PublicLayout from "../layouts/public";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Category from "../pages/Category";
import Products from "../pages/Products";

import Options from "../pages/Options";
import Variations from "../pages/Variations";
import Orders from "../pages/Orders";
import Users from "../pages/Users";


import Login from '../pages/Login';
import Attributes from "../pages/Attributes";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AuthenticatedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Category />} />
        <Route path="/attributes" element={<Attributes />} />
        <Route path="/options" element={<Options />} />
        <Route path="/variations" element={<Variations />} />
        <Route path="/products" element={<Products />} />
        <Route path="/options" element={<Options />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
 
      </Route>
    </Routes>
  );
}

export default App;