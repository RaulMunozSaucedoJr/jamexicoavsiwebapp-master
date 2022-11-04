import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Button } from "../../../Indexes/AtomsIndexes";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";

/* A React component that is using the React Hooks API to manage the state of the component. */
const Jobs = () => {
  /* A React Hook that is used to manage the state of the component. */
  const [tasks, setTasks] = useState([]);

  /* A pagination system. */
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 1;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(tasks.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  /* This is a React Hook that is used to manage the state of the component. */
  useEffect(() => {
    const collectionRef = collection(db, "platforms");
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
          <div className="col-sm-12 col-md-6 jobs-left center">
            <h1>Bolsas de empleo</h1>
            <Link to={Routing.Home}>
              <Button
                id="button"
                text="Volver al inicio"
                className="btn btn-open"
                type="button"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 jobs-right"></div>
          <div className="col-sm-12 col-md-12 jobs-bottom">
            <div className="form-group pt-2 mb-2 text-center">
              <label htmlFor="search" className="form-label label-white">
                Filtrar bolsas de empleo...
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Filtre aquí..."
                className="form-control"
              />
            </div>
            <div className="row">
              <div className="col-12 pt-2 d-sm-block d-md-none">
                {/* A ternary operator that is used to check if the length of the tasks array is equal to zero. If it
                is, then it will display a message that says that there are no tasks registered. If it is not, then
                it will display the tasks that are registered. */}
                {tasks.length === 0 ? (
                  <div className="alert alert-warning text-center" role="alert">
                    <h4>
                      <strong>¡No hay bolsas de empleo registradas!.</strong>
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
                    .map(
                      ({
                        task,
                        platform,
                        description,
                        ubication,
                        id,
                        timestamp,
                      }) => (
                        <div className="col-12" key={id}>
                          <div className="card">
                            <div className="card-body">
                              <div className="card-header">
                                <h1 className="text-center">{task}</h1>
                              </div>
                              <h3>Descripción:</h3>
                              <p>{description}</p>
                              <h3>Link:</h3>
                              <a
                                rel="nofollow noopener noreferrer"
                                href={platform}
                              >
                                <span className="badge badge-link">
                                  {platform}
                                </span>
                              </a>
                              <h3>Ubicacion</h3>
                              <p>{ubication}</p>
                            </div>
                            <div className="card-footer">
                              <small>
                                Fecha de creación/modificaciòn:
                                <br />
                                {new Date(
                                  timestamp.seconds * 1000
                                ).toLocaleString()}
                              </small>
                            </div>
                          </div>
                        </div>
                      )
                    )
                )}
              </div>
              <div className="col-12 pt-4 center">
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

export default Jobs;
