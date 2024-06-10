import React from "react";

import NavbarDark from "../../componants/navbarDark";
import Footer from "../../componants/footer";
import ScrollTop from "../../componants/scrollTop";


import 'react-toastify/dist/ReactToastify.css';

export default function CreateCV() {

  return (
    <>
      <NavbarDark />
      <section className="section">
        <div className="container">
          Tao CV 101
        </div>
      </section>
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}
