import Header from "../components/header";

const Gallery = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8">
      <Header />
      <div className="col-span-full row-span-6 grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full gap-8 overflow-y-auto">
        <div className="col-span-full bg-black rounded-xl"></div>
        <div className="col-span-2 row-span-2 bg-black rounded-xl"></div>
        <div className="col-span-2 row-span-3 bg-black rounded-xl"></div>
        <div className="col-span-2 row-span-2 bg-black rounded-xl"></div>
        <div className="col-span-2 row-span-2 bg-black rounded-xl"></div>
        <div className="col-span-2 row-span-1 bg-black rounded-xl"></div>
      </div>
    </div>
  );
};

export default Gallery;
