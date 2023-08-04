import Header from "../components/header";

const Pengaturan = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-6 h-full p-5 gap-8 ml-20">
      <Header />
      <div className="flex flex-col items-center col-span-full row-span-5">
        <h3 className="mb-3">Pengaturan</h3>
      </div>
    </div>
  );
};

export default Pengaturan;
