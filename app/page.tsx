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
