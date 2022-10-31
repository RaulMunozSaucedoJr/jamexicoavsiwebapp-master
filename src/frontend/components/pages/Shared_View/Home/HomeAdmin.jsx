import React from "react";
import Card from "../../../User_Interface/Organisms/Card/Card";

const HomeAdmin = ({ user }) => {
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

          {user.rol === "superadmin" ? (
            <>
              <div className="col-sm-12 col-md-6 admin-tools-left center">
                <h1>Herramientas para super-administradores</h1>
                <p>
                  A continuación se muestran las herramientas con las que
                  contarán los administradores
                </p>
              </div>
              <div className="col-sm-12 col-md-6 admin-tools-right"></div>
              <div className="col-sm-12 col-md-12 admin-tools-bottom">
                <div className="row">
                  <div className="col-sm-12 col-md-12 pt-2">
                    <h1>Manejadores de contenido</h1>
                    <div className="alert alert-primary" role="alert">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                      <small className="text-black">
                        <strong>
                          NOTA:
                          <br /> Únicamente usted podrá crear más usuarios con
                          rol de administradores así como los usuarios
                          genericos.
                        </strong>
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Bolsas de empleo"
                      cardText="Aqui podras registrar las diferentes bolsas de trabajo, tanto las digitales internacionales como las naciones de cada entidad del pais."
                      secondarycardText=""
                      smallText="/CmsEmployments"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Blog"
                      cardText="Aqui podras registrar, consultar, eliminar los distintos tipos de publicaciones, tanto de tecnologia asi como economia, etc."
                      secondarycardText=""
                      smallText="/CmsBlog"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Faq´s"
                      cardText="Aqui podras registrar, consultar, eliminar las preguntas frecuentes que puedan tener tanto los usuarios asi como los administradores"
                      secondarycardText=""
                      smallText="/CmsFaqs"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Usuarios"
                      cardText="Aqui podras registrar, consultar, eliminar a los usuarios que usan la plataforma, desde usuarios generales asi como administradores."
                      secondarycardText=""
                      smallText="/CmsUsers"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Perfiles"
                      cardText="Aqui podras registrar, consultar, eliminar la información personal y laboral de cada uno de los usuarios."
                      secondarycardText=""
                      smallText="/CmsUserProfile"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Tips"
                      cardText="Aqui podras registrar, consultar, eliminar los distintos tips para el empleo."
                      secondarycardText=""
                      smallText="/CmsTips"
                    />
                  </div>
                  <div className="col-sm-12 col-md-12 pt-4">
                    <p className="text-white">
                      <strong>
                        Aparte de poder hacer uso de todas estas herramientas,
                        tú como super(administrador) podrás hacer uso de las
                        secciones/herramientas del usuario general.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {user.rol === "admin" ? (
            <>
              <div className="col-sm-12 col-md-6 admin-tools-left center">
                <h1>Herramientas para administradores</h1>
                <p>
                  A continuación se muestran las herramientas con las que
                  contarán los administradores
                </p>
              </div>
              <div className="col-sm-12 col-md-6 admin-tools-right"></div>
              <div className="col-sm-12 col-md-12 admin-tools-bottom">
                <div className="row">
                  <div className="col-sm-12 col-md-12 pt-2">
                    <h1>Manejadores de contenido</h1>
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Bolsas de empleo"
                      cardText="Aqui podras registrar las diferentes bolsas de trabajo, tanto las digitales internacionales como las naciones de cada entidad del pais."
                      secondarycardText=""
                      smallText="/CmsEmployments"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Blog"
                      cardText="Aqui podras registrar, consultar, eliminar los distintos tipos de publicaciones, tanto de tecnologia asi como economia, etc."
                      secondarycardText=""
                      smallText="/CmsBlog"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Faq´s"
                      cardText="Aqui podras registrar, consultar, eliminar las preguntas frecuentes que puedan tener tanto los usuarios asi como los administradores"
                      secondarycardText=""
                      smallText="/CmsFaqs"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Informaciòn personal"
                      cardText="Aqui podras registrar, consultar, eliminar la información personal de cada uno de los usuarios, independientemente de su email y/o contraseña"
                      secondarycardText=""
                      smallText="/CmsUserProfile"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Tips"
                      cardText="Aqui podras registrar, consultar, eliminar los distintos tips para el empleo."
                      secondarycardText=""
                      smallText="/CmsTips"
                    />
                  </div>
                  <div className="col-sm-12 col-md-3 pt-2">
                    <Card
                      alternativeTExt="Imagen de Card"
                      title="CMS Informaciòn laboral"
                      cardText="Aqui podras registrar, consultar, eliminar la información laboral de los distintos usuarios."
                      secondarycardText=""
                      smallText="/CmsProfessionalData"
                    />
                  </div>
                  <div className="col-sm-12 col-md-12 pt-4">
                    <p className="text-white">
                      <strong>
                        Aparte de poder hacer uso de todas estas herramientas,
                        tú como administrador podrás hacer uso de las
                        secciones/herramientas del usuario general.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {user.rol === "user" ? (
            <>
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
            </>
          ) : (
            <></>
          )}

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

export default HomeAdmin;
