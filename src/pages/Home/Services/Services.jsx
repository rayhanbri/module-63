import servicesData from "./servicesData";
import ServiceCard from "./ServiceCard";

const Services = () => {
  return (
    <div className="bg-[#00323D] py-16 px-4 md:px-8 rounded-4xl my-4">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="mb-12 text-gray-200 max-w-3xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;