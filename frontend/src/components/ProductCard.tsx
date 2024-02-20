import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartPlus } from "react-bootstrap-icons";
import { AppContext } from "../contexts";
import "../types";

function ProductCard({ id, name, price, image }: Product) {
  const navigate = useNavigate();
  let { user, cart } = useContext(AppContext);

  const addToCart = (productId: string | number) => {
    if (!user) {
      navigate("/auth/login");
    } else {
      cart = [...cart, productId];
    }
  };

  return (
    <div className="bg-bgSecondary border border-textYellow overflow-hidden">
      <img
        src={image}
        alt="product-img"
        className="w-full h-[200px] object-cover hover:scale-[1.1] transition-all duration-200"
      />
      <div className="p-2">
        <p className="text-[0.8rem]">{name}</p>
        <div className="mt-[0.5em] flex items-center justify-between">
          <span className="font-bold text-[0.8rem]">N {price}</span>
          <CartPlus className="text-[1.2rem]" onClick={() => addToCart(id)} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
