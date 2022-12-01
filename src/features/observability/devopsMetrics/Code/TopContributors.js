import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { commit, profile } from "../../../../assets/images";

const TopContributors = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      {/* <Carousel activeIndex={index}  onSelect={handleSelect} class="carousel-inner">
      <Carousel.Item>
      <div class="col-md-12 row">
      <div class='col-md-4'>
       <div class="panel-inner_class height_95">
        <div class="col-md-12 p-0">
        <div class="col-md-5 p-0 row usercode">
          <img src={profile} class="rounded-circle profile-pic" alt="" />
        </div>
        </div>
       </div>
      </div>
      </div>
      </Carousel.Item>
    </Carousel> */}
      <div class="carousel-inner" id="commitData11">
        <div class="carousel-item active">
          <div class="col-md-12 row">
            <div class="col-md-4">
              <div class="panel-inner_class height_95">
                <div class="col-md-12 p-0">
                  <div class="col-md-5 p-0 row usercode">
                    <img
                      src={profile}
                      class="rounded-circle profile-pic"
                      alt=""
                    />
                    <span class="user-lan-2">
                      {" "}
                      <span class="">
                        {" "}
                        <span class="">Suresh</span>{" "}
                      </span>
                    </span>
                  </div>
                  <div class="pscroll">
                    <div class="col-md-12 p-0 row mt-20">
                      <div class="col-2 p-0">
                        {" "}
                        <div class="cal-legent">
                          <div>Commit</div> <img src={commit} class="" />{" "}
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </>
  );
};

export default TopContributors;
