import React from "react";
import Footer from "./Footer";

const Gallery = () => {
  return (
    <section className="row">
      <div className="container">

        {/* Section 1 */}
        <div className="text-center mb-5">
          <h2 className="simple-topic fw-bold">Weddings</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <img src="images/ibrahim-boran-m8YjB0noWiY-unsplash.jpg" alt="" width="100%" />
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/iskra-photography-iXTkKQyVqbM-unsplash.jpg" alt="" width="100%" />
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/jose-marroquin-Uuriz7Iuyvc-unsplash.jpg" alt="" width="100%" />
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/luigi-pozzoli-34Xicn82lY4-unsplash.jpg" alt="" width="100%" />
          </div>
        </div>

        <br /><br />

        {/* Section 2 */}
        <div className="text-center mb-5">
          <h2 className="simple-topic fw-bold">Birthdays</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <img src="images/jonathan-borba-B_R3rmJPeSE-unsplash.jpg" alt="" width="100%"  height="200px"/>
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/the-decor-seo-3FGvMGhEYpo-unsplash.jpg" alt="" width="100%" height="200px" />
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/ridham-supriyanto-4FGhD_iGuqg-unsplash.jpg" alt="" width="100%" height="200px" />
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/tabitha-turner-GYQuKGktCt4-unsplash.jpg" alt="" width="100%" height="200px" />
          </div>
        </div>

        {/* another section */}

        <div className="text-center mb-5">
          <h2 className="simple-topic fw-bold">Baby Showers</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <img src="images/tamara-govedarovic-7d0-zkJ51Yk-unsplash.jpg" alt="" width="100%"  height="200px"/>
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/samuel-lopez-cruz-wAjr2402a0g-unsplash.jpg" alt="" width="100%" height="200px" />
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/moses-janga-ulbfB4Lk1R4-unsplash.jpg" alt="" width="100%" height="200px" />
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/tamara-govedarovic-y-osQfLzYkM-unsplash.jpg" alt="" width="100%" height="200px" />
          </div>
        </div>

        {/* another section */}

        <div className="text-center mb-5">
          <h2 className="simple-topic fw-bold">Cooperate Events</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <img src="images/ezebunwo-omachi-Sx2yNRb3GYU-unsplash.jpg" alt="" width="100%"  height="200px"/>
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/pexels-seun-oderinde-325145166-30935447.jpg" alt="" width="100%" height="200px" />
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="/images/pexels-hson-6028760.jpg" alt="" width="100%" height="200px" />
          </div>

          <div className="col-md-3 col-sm-6">
            <img src="images/pexels-bertellifotografia-17206149.jpg" alt="" width="100%" height="200px" />
          </div>
        </div>
        <Footer/>
        

      </div>
      

      
    </section>

  );
};

export default Gallery;