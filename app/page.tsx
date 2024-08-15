import { auth } from "@/auth";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const session = await auth();
  console.log("user found -> ", session?.user);
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
