import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Button } from "../../../Indexes/AtomsIndexes";
import * as Routing from "../../../../assets/javascript/constants/routing/routing";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";

const Tips = () => {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(tasks.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const collectionRef = collection(db, "tips");
  useEffect(() => {
    const getTasks = async () => {
      const q = query(collectionRef, orderBy("timestamp"));
      await getDocs(q)
        .then((tasks) => {
          let tasksData = tasks.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTasks(tasksData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 tips-left center">
            <h1>Tips</h1>
            <Link to={Routing.Home}>
              <Button
                type="Button"
                text="Regresar al inicio"
                className="btn btn-open"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 tips-right"></div>
          <div className="col-sm-12 col-md-12 tips-bottom">
            <div className="row">
              <div className="form-group pt-2 mb-2 text-center">
                <label htmlFor="search" className="form-label label-white">
                  Filtrar tips para el empleo
                </label>
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Filtre aqu??..."
                  className="form-control"
                />
              </div>
             
              <div className="col-12 pt-2 d-sm-block d-md-none">
              {tasks.length === 0 ? (
                  <div className="alert alert-warning text-center" role="alert">
                    <h4>
                      <strong>??No hay tips registrados!.</strong>
                    </h4>
                    <p>
                      <strong>
                        Favor de comunicar este inconveniente al equipo de TI.
                      </strong>
                    </p>
                  </div>
                ) : (
                  tasks
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map(({ task, category, content, id, timestamp }) => (
                      <div className="col-12" key={id}>
                        <div className="card">
                          <div className="card-body">
                            <div className="card-header">
                              <h1 className="text-center">{task}</h1>
                            </div>
                            <h3>Categor??a:</h3>
                            <p>{category}</p>
                            <h3>Contenido:</h3>
                            <p>{content}</p>
                          </div>
                          <div className="card-footer">
                            <small>
                              Fecha de creaci??n/modificaci??n:
                              <br />
                              {new Date(
                                timestamp.seconds * 1000
                              ).toLocaleString()}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
              <div className="col-12 pt-4">
                <ReactPaginate
                  breakLabel="..."
                  previousLabel={
                    <box-icon name="skip-previous" color="white" size="sm" />
                  }
                  nextLabel={
                    <box-icon name="skip-next" color="white" size="sm" />
                  }
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tips;
