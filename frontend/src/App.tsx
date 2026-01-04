import { Navigate, Route, Routes } from "react-router";
import NavBar from "./components/nav-bar";
import HomePage from "./pages/home-page";
import ProductPage from "./pages/product-page";
import ProfilePage from "./pages/profile-page";
import CreatePage from "./pages/create-page";
import EditProductPage from "./pages/edit-product-page";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";

function App() {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;

  return (
    <div className="min-h-screen ">
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route
            path="/profile"
            element={
              isSignedIn ? (
                <ProfilePage />
              ) : (
                <Navigate to={"/"} replace={true} />
              )
            }
          ></Route>
          <Route
            path="/create"
            element={
              isSignedIn ? <CreatePage /> : <Navigate to={"/"} replace={true} />
            }
          ></Route>
          <Route
            path="/edit"
            element={
              isSignedIn ? (
                <EditProductPage />
              ) : (
                <Navigate to={"/"} replace={true} />
              )
            }
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
