import Marquee from "react-fast-marquee";

const ExtraSection1 = () => {
  const brands = [
    "Square",
    "Beximco",
    "Renata",
    "Acme",
    "Opsonin",
    "Eskayef",
    "Incepta",
    "Others"
  ];

  return (
    <div className="my-8 bg-gray-100 p-4 rounded-xl shadow-md">
      <h2 className="sm:text-lg md:text-2xl lg:text-4xl font-extrabold text-center mb-4 text-red-700">Our Medicine Brands</h2>
      <Marquee
        direction="left"  // Move from left to right
        speed={50}
        gradient={false}
        pauseOnHover={true}
      >
        {brands.map((brand, index) => (
          <div
            key={index}
            className="mx-6 text-lg font-semibold text-black"
          >
            "{brand}"
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ExtraSection1;
