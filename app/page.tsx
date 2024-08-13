import Image from "next/image";
import { products } from "./lib/data";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { philosopher } from "./layout";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <>
      <div className="w-full h-full bg-black">
        <MainContent />
      </div>
    </>
  );
}

function MainContent() {
  return (
    <div className="w-full">
      <ProductCard />
    </div>
  );
}
