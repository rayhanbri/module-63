import Marquee from "react-fast-marquee";
import casio from "../../../../assets/brands/casio.png";
import amazon from "../../../../assets/brands/amazon.png";
import moonstar from "../../../../assets/brands/moonstar.png";
import starplus from "../../../../assets/brands/start-people 1.png";
import startpeople from "../../../../assets/brands/randstad.png";
import randstad from "../../../../assets/brands/start.png";

const BrandMarquee = () => {
    return (
        <div className="bg-gray-100 py-8  my-8 rounded-xl">
            <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-[#00323D]">
                    We've helped thousands of sales teams
                </h2>
            </div>

            <Marquee
                pauseOnHover={true}
                gradient={false}
                speed={30}
                direction="left"
                className="mb-4"
            >
                <div className="flex space-x-12 items-center">
                    <img src={casio} alt="casio" className="h-8 object-contain" />
                    <img src={amazon} alt="amazon" className="h-8 object-contain" />
                    <img src={moonstar} alt="moonstar" className="h-8 object-contain" />
                    <img src={starplus} alt="starplus" className="h-8 object-contain" />
                    <img src={startpeople} alt="startpeople" className="h-8 object-contain" />
                    <img src={randstad} alt="randstad" className="h-8 object-contain" />
                </div>
            </Marquee>

            <div className="border-t border-dashed border-gray-400 mx-4"></div>
        </div>
    );
};

export default BrandMarquee;
