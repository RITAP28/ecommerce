import ProductCard from "./components/ProductCard";

export default async function Home() {
  return (
    <>
      <div className="w-full h-full bg-slate-500">
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
