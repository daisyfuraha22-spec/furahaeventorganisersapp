import React from 'react';


const Carousel = () => {
  return (
    <div className="container mt-4">

      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">

        {/* INDICATORS */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
        </div>

        {/* SLIDES */}
        <div className="carousel-inner">

          {/* SLIDE 1 */}
          <div className="carousel-item active">
            <img
              src="/images/luigi-pozzoli-34Xicn82lY4-unsplash.jpg"
              className="d-block w-100"
              alt="wedding deco"
              style={{ height: "600px", objectFit: "cover" }}
            />

            <div className="carousel-caption d-none d-md-block">
              <h5 className="fs-1 text-danger text-center fw-bold">
                Making Your Events Elegant and Unforgettable
              </h5>
              <p className="fs-2 text-dark text-center">
                We Plan, decorate, and manage events with style and precision.
              </p>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="carousel-item">
            <img
              src="/images/the-decor-seo-3FGvMGhEYpo-unsplash.jpg"
              className="d-block w-100"
              alt="valentines"
              style={{ height: "600px", objectFit: "cover" }}
            />

            <div className="carousel-caption d-none d-md-block">
              <h5 className="fs-1 text-dark text-center fw-bold">
                Make Your Events Unforgettable
              </h5>
             
            </div>
          </div>

          {/* SLIDE 3 */}
          <div className="carousel-item">
            <img
              src="/images/jose-marroquin-Uuriz7Iuyvc-unsplash.jpg"
              className="d-block w-100"
              alt="birthday"
              style={{ height: "600px", objectFit: "cover" }}
            />

            <div className="carousel-caption d-none d-md-block">
              <h5 className="fs-1 text-dark text-center fw-bold">
                Birthday decor
              </h5>
              <p className="fs-2 text-danger text-center">
                From the setup, to the venue, to the decoration everything is done by us.
              </p>
            </div>
          </div>

        </div>

        {/* CONTROLS */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>
    </div>
  );
};

export default Carousel;