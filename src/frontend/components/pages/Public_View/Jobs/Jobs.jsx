import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Button } from "../../../Indexes/AtomsIndexes";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";

const Jobs = () => {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(tasks.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const collectionRef = collection(db, "platforms");
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
              <label
                htmlFor="search"
                className="form-label label-inmersive-blue"
              >
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
                {tasks
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map(({ task, platform, description, id, timestamp }) => (
                    <div className="col-12 pt-2" key={id}>
                      <div className="card">
                        <div className="card-body">
                          <div className="card-header">
                            <h1 className="text-center">{task}</h1>
                          </div>
                          <p className="card-text">{platform}</p>
                          <p className="card-text">{description}</p>
                        </div>
                        <div className="card-footer">
                          <small>
                            Fecha de creación:
                            <br />
                            {new Date(
                              timestamp.seconds * 1000
                            ).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="col-12 pt-4">
                <ReactPaginate
                  breakLabel="..."
                  previousLabel={"<-"}
                  nextLabel={"->"}
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
