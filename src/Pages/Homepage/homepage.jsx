import React from "react";
import timberimg from "../../assets/KTM.jpg";
import { Button } from "../../Components/Button";
import FeatureIconCard from "../../Components/FeatureIconCard";
export default function homepage() {
  const productCategories = [
    { title: "Timber", icon: "HardHat" }, // Representing construction/wood
    { title: "Doors", icon: "ExternalLink" }, // Representing a door/opening
    { title: "Plywoods & Laminates", icon: "Layers" }, // Representing stacked material
    { title: "Hardwares", icon: "Tool" }, // Representing tools/hardware
    { title: "Adhesives", icon: "Droplet" }, // Representing liquids/glue
  ];
  return (
    <>
      <div className="flex">
        <div>
          <div className="m-10 md:text-7xl text-4xl text-bold">
            Building Dreams,
            <br />
            One Log At A Time
          </div>
          <div className="m-10 md:text-4xl text-2xl text-bold">
            We provide premium timber for all
            <br />
            your construction needs
          </div>
          <Button
            className="mx-10"
            text="Get Started"
            onClick={() => alert("Button Clicked!")}
          />
        </div>
        <div>
          <img
            src={timberimg}
            alt="Timber img"
            className="m-0"
            style={{ width: "600px" }}
          />
        </div>
      </div>
      <div className="px-24">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Products
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 lg:gap-8 pb-20">
          {productCategories.map((item) => (
            <FeatureIconCard
              key={item.title}
              title={item.title}
              iconName={item.icon}
            />
          ))}
        </div>
      </div>
      <div className="text-center py-16">
        <p className="text-base text-gray-700 max-w-4xl mx-auto">
          With over 20 years of trusted experience, Kalyani Timber Mart stands
          as a leading supplier of premium-quality timber in Bengaluru. Located
          on Sarjapur Main Road, we offer a wide selection of Burma Teak, sal
          wood , Pinewood, and Hardwood—each piece carefully sourced and
          inspected for superior strength and finish.
        </p>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Our commitment to quality, transparency, and customer trust has made
          us a preferred choice for builders, architects, and furniture makers
          across the city.
        </p>
        <p className="text-base font-medium text-gray-800 max-w-4xl mx-auto mt-4">
          At Kalyani Timber Mart, we don't just deliver wood—we deliver
          confidence, consistency, and craftsmanship in every order.
        </p>
      </div>
    </>
  );
}
