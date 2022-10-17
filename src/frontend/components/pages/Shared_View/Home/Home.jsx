import React from "react";
import Card from "../../../User_Interface/Organisms/Card/Card";
import Blog from "../../../../assets/images/jpg/Blog.jpg";
import Job from "../../../../assets/images/jpg/Job.jpg";
import Tips from "../../../../assets/images/jpg/Tips.jpg";
import CV from "../../../../assets/images/jpg/cv.jpg";
//import { UserAuth } from "../../../../context/AuthContext.js";

const Home = () => {
  //const { user } = UserAuth();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 header-home-left center">
            <h1>JUVENTUDES</h1>
            <p>
              Somos un conjunto de asociaciones civiles las cuales brindamos
              herramientas necesarias para apoyar los distintos tipos de
              emprendimiento en Mexico.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 header-home-right">
            <div className="row">
              <div className="col-sm-12 col-md-6 header-home-right-1"></div>
              <div className="col-sm-12 col-md-6 header-home-right-2"></div>
              <div className="col-sm-12 col-md-6 header-home-right-3"></div>
              <div className="col-sm-12 col-md-6 header-home-right-4"></div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 mision-left center">
            <h1>Nuestra misión</h1>
            <p>
              Es capacitar a ls jovenes mediante distintos medios de
              comunicacion, tanto presencial como virtualmente a traves de
              distintas herramientas pedagogicas y/o tecnologicas.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 mision-right"></div>

          <div className="col-sm-12 col-md-6 tools-left"></div>
          <div className="col-sm-12 col-md-6 tools-right">
            <h1>Nuestras herramientas</h1>
            <p>
              Algunas de las herramientas digitales que estamos por ofrecer son
              las siguientes:
            </p>
          </div>
          <div className="col-sm-12 col-md-12 tools-bottom center">
            <div className="row">
              <div className="col-sm-12 col-md-3 pt-3">
                <Card
                  imageUrl={Job}
                  alternativeTExt="Imagen de Card"
                  title="Bolsas de trabajo"
                  cardText="Aqui podras encontrar las diferentes bolsas de trabajo, tanto las digitales internacionales como las naciones de cada entidad del pais."
                  secondarycardText=""
                  smallText="Para mas detalles visite la seccion correspondiente"
                />
              </div>
              <div className="col-sm-12 col-md-3 pt-3">
                <Card
                  imageUrl={Blog}
                  alternativeTExt="Imagen de Card"
                  title="Blog"
                  cardText="Aqui podras encontrar distintos tipos de publicaciones, tanto de tecnologia asi como economia, etc."
                  secondarycardText=""
                  smallText="Para mas detalles visite la seccion correspondiente"
                />
              </div>
              <div className="col-sm-12 col-md-3 pt-3">
                <Card
                  imageUrl={Tips}
                  alternativeTExt="Imagen de Card"
                  title="Tips"
                  cardText="Aqui podras encontrar distintos tipos de tipis para obtener tu primer empleo. Los tips van desde como hacer tu primer C.V. hasta como hablar en una entrevista."
                  secondarycardText=""
                  smallText="Para mas detalles visite la seccion correspondiente"
                />
              </div>
              <div className="col-sm-12 col-md-3 pt-3">
                <Card
                  imageUrl={CV}
                  alternativeTExt="Imagen de Card"
                  title="Perfil"
                  cardText="Aqui podras ver tu informacion previamente registrada, la cual podras compartir con tus conocidos y/o reclutadores."
                  secondarycardText=""
                  smallText="Para mas detalles visite la seccion correspondiente"
                />
              </div>
            </div>
          </div>

          <div className="col-sm-3 col-md-3 faqs-home-left center">
            <h1>Preguntas frecuentes</h1>
          </div>
          <div className="col-sm-9 col-md-9 faqs-home-right">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Accordion Item #1
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It
                    is shown by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Accordion Item #2
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong>{" "}
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Accordion Item #3
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
