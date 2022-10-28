import React from "react";
import Card from "../../../User_Interface/Organisms/Card/Card";

const HomeVisitors = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 header-home-left center">
            <h1>JUVENTUDES</h1>
            <p>
              Somos una plataforma la cual responde al problema que enfrentan
              los jovenes para encontrar su primer empleo, ya sea por falta de
              oportunidades, conocimientos y/o habilidades.
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
            <h1>Nuestro objetivo</h1>
            <p>
              Es otorgar a los jovenes herramientas digitales con las cuales
              estos podrán realizar exitosamente la busqueda de su primer
              empleo. Siendoles de ayuda las herramientas descritas en la
              siguiente sección.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 mision-right"></div>
          <div className="col-sm-12 col-md-6 tools-right">
            <h1>Herramientas para tu primer empleo</h1>
          </div>
          <div className="col-sm-12 col-md-6 tools-bottom">
            <div className="row">
              <div className="col-sm-12 col-md-12 pt-2">
                <h1>Herramientas para usuarios</h1>
              </div>
              <div className="col-sm-12 col-md-3 pt-2">
                <Card
                  alternativeTExt="Imagen de Card"
                  title="Simulador de entrevistas"
                  cardText="Aquí el usuario podrá ingresar a una video conferencia en determinada fecha cada ciertos meses. En la cual se les darán consejos sobre como afrontar las entrevistas de HH.RR y técnicas."
                  secondarycardText=""
                  smallText="/Interview"
                />
              </div>
              <div className="col-sm-12 col-md-3 pt-2">
                <Card
                  alternativeTExt="Imagen de Card"
                  title="Creador de CV´s"
                  cardText="Aquí el usuario podrá crear su C.V., registrando toda su informaciòn personal y/o laboral para posteriormente imprimirlo"
                  secondarycardText=""
                  smallText="/CVCreator"
                />
              </div>
              <div className="col-sm-12 col-md-3 pt-2">
                <Card
                  alternativeTExt="Imagen de Card"
                  title="Chat"
                  cardText="Aqui podra chatear con otros usuarios igual que el y compartir ideas, tips, etc."
                  secondarycardText=""
                  smallText="/PantallaChat"
                />
              </div>
              <div className="col-sm-12 col-md-3 pt-2">
                <Card
                  alternativeTExt="Imagen de Card"
                  title="Tips para tu primer empleo"
                  cardText="Aqui podra consultar los diferentes tipos de tips para que a la hora de que se enfrenten a su primer entrevista, ya lleven un background sobre que hacer y que no."
                  secondarycardText=""
                  smallText="/Tips"
                />
              </div>
              <div className="col-sm-12 col-md-3 pt-2">
                <Card
                  alternativeTExt="Imagen de Card"
                  title="Blog"
                  cardText="Aqui podra consultar diferentes topicos sobre tu primer empleo entre otros, aparte de poder crear nuevos posts y compartirlos con los demas usuarios."
                  secondarycardText=""
                  smallText="/Posts"
                />
              </div>
              <div className="col-sm-12 col-md-3 pt-2">
                <Card
                  alternativeTExt="Imagen de Card"
                  title="Bolsas de empleo"
                  cardText="Aqui podra consultar las diferentes bolsas de empleo, ya sean las plataformas nacionales, populares, etc."
                  secondarycardText=""
                  smallText="/Jobs"
                />
              </div>
              <hr />
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

export default HomeVisitors;
