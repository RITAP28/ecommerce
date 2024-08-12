import Image from "next/image";
import Header from "./components/Header";
import { products } from "./lib/data";

export default function Home() {
  return (
    <>
    <div className="w-full h-[5rem]">
      <MainContent />
    </div>
    </>
  );
}

function MainContent() {
  return (
    <div className="">
      {products.map((product, index) => (
        <div className="" key={index}>
          {product.name}
        </div>
      ))}
    </div>
  )
}
