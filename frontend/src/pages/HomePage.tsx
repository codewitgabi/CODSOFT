import { useEffect, useContext } from "react";
import ModeSwitch from "../components/ModeSwitch";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../contexts";
import "../types";

const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT;

function HomePage() {
  const {products} = useContext(AppContext);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`${SERVER_ROOT}/api/products/`);
      const data = await response.json();

      if (response.ok) {
        products.push(data);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="body-secondary">
      <NavBar />
      <div className="body mx-[1em] my-[2em]">
        <div className="grid grid-cols-2 gap-x-[1em] gap-y-[1em] md:w-4/5 md:mx-auto md:grid-cols-3 lg:grid-cols-4">
          {products ? (
            products.map((product: Product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                />
              );
            })
          ) : (
            <h1>No products at the moment</h1>
          )}
        </div>
        <ModeSwitch />
      </div>
      {/* <p>Logged in as { user?.username || "Anonymous" }</p> */}
      <Footer />
    </div>
  );
}

export default HomePage;
