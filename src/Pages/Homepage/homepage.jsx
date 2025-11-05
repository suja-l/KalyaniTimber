import React from "react";
import timberimg from "../../assets/KTM.jpg";
export default function homepage() {
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
        </div>
        <div>
          <img src={timberimg} alt="Timber img" style={{ width: "1000px" }} />
        </div>
      </div>
      <div className="m-10 md:text-2xl text-lg text-bold">
        With over 20 years of trusted experience, Kalyani Timber Mart stands as
        a leading supplier of premium-quality timber in Bengaluru. Located on
        Sarjapur Main Road, we offer a wide selection of Burma Teak, Sudan Teak,
        Pinewood, and Hardwood-each piece carefully sourced and inspected for
        superior strength and finish. Our commitment to quality, transparency,
        and customer trust has made us a preferred choice for builders,
        architects, and furniture makers across the city. At Kalyani Timber
        Mart, we don't just deliver wood-we deliver confidence, consistency, and
        craftsmanship in every order.
      </div>
    </>
  );
}
