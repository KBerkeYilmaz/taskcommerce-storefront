import { dummyData } from "../server/db/dummy";
import { Plus } from "lucide-react";
import GridLayout from "../components/GridLayout";
import Carousel from "../components/Carousel";

function Home() {
  return (
    <GridLayout title={"Welcome"}>
      {dummyData.products.map((product) => (
        <div
          className="border p-4 min-h-fit"
          key={product.id}
        >
          <img
            src={product.gallery[0]}
            alt="product"
            className="object-contain w-full h-72"
          />
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h2 className="text:lg lg:text-xl">{product.name}</h2>
              <p className="text-sm">
                {product.prices[0].amount}
                {product.prices[0].currency.symbol}
              </p>
            </div>
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
              <Plus />
            </button>
          </div>
        </div>
      ))}
      <Carousel />
    </GridLayout>
  );
}

export default Home;
