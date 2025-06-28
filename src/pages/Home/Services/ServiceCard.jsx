import { FaBox } from "react-icons/fa"; // example icon
import PropTypes from "prop-types";

const ServiceCard = ({ title, description, highlight }) => {
  return (
    <div
      className={`rounded-xl shadow-md p-6 
        hover:bg-emerald-200 border-x-lime-500
        transition duration-300 ease-in-out ${
        highlight ? "bg-lime-200 text-black" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex justify-center mb-4 text-3xl text-[#00323D]">
        <FaBox />
      </div>
      <h3 className="font-bold text-lg text-center mb-2">{title}</h3>
      <p className="text-sm text-center">{description}</p>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  highlight: PropTypes.bool,
};

export default ServiceCard;
