import Header from "../components/header";

const Gallery = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8 ml-14 sm:ml-20">
      <Header />
      <div className="col-span-full row-span-5 grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full gap-8 overflow-y-auto">
        <div className="col-span-full sm:row-span-2 bg-black rounded-xl">1</div>
        <div className="col-span-2 row-span-2 md:col-span-3 md:row-span-4 bg-black rounded-xl">
          2
        </div>
        <div className="col-span-2 row-span-3 md:col-span-4 md:row-span-2 lg:col-span-3 bg-black rounded-xl">
          3
        </div>
        <div className="col-span-2 row-span-3 md:row-span-2 md:col-span-5 lg:col-span-4 bg-black rounded-xl">
          4
        </div>
        <div className="col-span-2 row-span-2 md:col-span-6 lg:col-span-2 lg:row-span-4 bg-black rounded-xl">
          5
        </div>
        <div className="col-span-2 row-span-2 md:col-span-6 lg:col-span-5 bg-black rounded-xl hidden lg:block">
          6
        </div>
        <div className="col-span-2 row-span-1 hidden md:col-span-3 md:row-span-2 md:block lg:col-span-2 bg-black rounded-xl lg:block">
          7
        </div>
      </div>
    </div>
  );
};

export default Gallery;
