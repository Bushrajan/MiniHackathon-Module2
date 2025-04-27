import Button1 from "./Button1";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
     

      <div
        className="container mx-auto  "
        data-aos="fade-down"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="2000"
      >
         <h2
        className=" text-center mt-3 mt-lg-5"
        data-aos="fade-up"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="2000"
      >
        Get In Touch With Us
      </h2>
      <p
        className="para text-center mt-2"
        data-aos="fade-up"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="2000"
      >
        Lorem ipsum dolor expedita est impedit possimus vel! Sequi ipsa maxime
        magnam repudiandae. Commodi?
      </p>

        <div className="row  d-flex-flex-lg-row justify-content-center align-items-center  flex-md-row flex-column">
          <div className="col bg-gray-300 rounded-2 text-dark  col-lg-3 p-lg-3 mt-5 mb-3">
            <div className="article-container justify-content-center align-items-center">
              <div className="article-content mt-5 d-flex justify-content-center align-items-center">
                <img
                  src="/loca.png"
                  alt="Notebook on wooden surface"
                  className="h-100"
                />
                <h6 className="p-2">
                  <p className="fs-5 m-0">
                    {" "}
                    Address <br />
                  </p>
                  <small className=" ">
                    236 5th SE Avenue, New <br />
                    York NY10000, United <br /> States
                  </small>
                </h6>
              </div>

              <div className="article-content justify-content-center align-items-center mt-5 d-flex">
                <img
                  src="/phone.png"
                  alt="Notebook on wooden surface"
                  className="h-100"
                />
                <h6 className="p-2 ">
                  <p className="fs-5 m-0">
                    {" "}
                    Phone <br />
                  </p>
                  <small className="  ">
                    Mobile: +(84) 546-6789 <br />
                    Hotline: +(84) 456-6789
                  </small>
                </h6>
              </div>

              <div className="article-content justify-content-center align-items-center mt-5 d-flex">
                <img
                  src="/clock.png"
                  alt="Notebook on wooden surface"
                  className="h-100"
                />
                <h6 className="p-2">
                  <p className="fs-5 m-0">
                    {" "}
                    Working Time <br />
                  </p>
                  <small className=" ">
                    Monday-Friday: 9:00 <br /> - 22:00 Saturday-Sunday: 9:00{" "}
                    <br />- 21:00
                  </small>
                </h6>
              </div>
            </div>
          </div>

          <div className="col col-lg-6 p-lg-3 mt-5 mb-3">
            <div className="div">
              <div className="mb-3 contactdiv">
                <label for="exampleFormControlInput1" className="form-label">
                  Your name
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Abc"
                />
              </div>

              <div className="mb-3 contactdiv">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Abc@def.com"
                />
              </div>
              <div className="mb-3 contactdiv">
                <label for="exampleFormControlInput1" className="form-label">
                  Subject
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="This is an optional"
                />
              </div>
              <div className="mb-3 contactdiv">
                <label
                  for="exampleFormControlInput1"
                  className="form-label"
                ></label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Hi! i’d like to ask about"
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Hi! i'd like to ask about"
                ></textarea>
              </div>

              <div className="mt-5 text-center">
                <Button1
                  text="Submit"
                  className="button text-light p-3 px-5 m-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
