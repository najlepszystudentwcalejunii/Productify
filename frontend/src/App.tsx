import { Route, Routes } from "react-router";
import NavBar from "./components/nav-bar";
import HomePage from "./pages/home-page";
import ProductPage from "./pages/product-page";
import ProfilePage from "./pages/profile-page";
import CreatePage from "./pages/create-page";
import EditProductPage from "./pages/edit-product-page";

function App() {
  return (
    <div className="min-h-screen ">
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/edit" element={<EditProductPage />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
