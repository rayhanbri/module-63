import React from "react";
import imag1 from "../../../../assets/delivary/customer-top.png";
import imag2 from "../../../../assets/delivary/safe-delivery.png";
import imag3 from "../../../../assets/delivary/tiny-deliveryman.png";

const FeatureCards = () => {
    const featureCards = [
        {
            id: 1,
            image: imag1,
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
        },
        {
            id: 2,
            image: imag2,
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
        },
        {
            id: 3,
            image: imag3,
            title: "24/7 Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
        }
    ];

    return (
        <div className="space-y-6 bg-[#FFFFFF70] ">
            {featureCards.map(({ id, image, title, description }) => (
                <div
                    key={id}
                    className="flex bg-white rounded-xl shadow-md overflow-hidden h-60"
                >
                    {/* Left - Image */}
                    <div className="w-1/3 p-7 flex items-center justify-center bg-[#FFFFFF70] ">
                        <img
                            src={image}
                            alt={title}
                            className="h-24 w-24 object-contain"
                        />
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-dotted h-auto mx-4 border-l border-dotted border-gray-300"></div>

                    {/* Right - Text */}
                    <div className="w-2/3 p-4 flex flex-col flex-start  justify-start items-center mx-auto">
                        <h3 className="text-lg font-semibold text-[#00323D]">{title}</h3>
                        <p className="  text-sm text-gray-600 mt-2">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeatureCards;