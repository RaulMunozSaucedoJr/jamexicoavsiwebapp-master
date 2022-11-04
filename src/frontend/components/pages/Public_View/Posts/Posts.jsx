import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Button } from "../../../Indexes/AtomsIndexes";
import AddPost from "./AddPosts";
import DeleteArticle from "./DeletePost";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../../backend/Firebase/Firebase-config";

/* The above code is a React component that is rendering a list of articles from a Firestore database. */
const Posts = () => {
  /* A React Hook that is used to get the current user from the Firebase authentication. */
  const [user] = useAuthState(auth);
  const [articles, setArticles] = useState([]);

  /* This is a React Hook that is used to set the state of the page number and the number of users per
  page. */
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 1;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(articles.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  /* This is a React Hook that is used to get the articles from the Firestore database. */
  useEffect(() => {
    const articleRef = collection(db, "tasks");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 posts-left center">
            <h1>Blog</h1>
            <Link to="/">
              <Button
                type="button"
                text="Regresar al inicio"
                className="btn btn-open"
              />
            </Link>
          </div>
          <div className="col-12 posts-right"></div>
          <div className="col-12 posts-bottom">
            <div className="row">
              <div className="col-md-4 offset-md-4 col pt-2">
                <button
                  className="btn btn-open"
                  id="button"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Agregar post
                </button>
              </div>
              <div className="col-12 pt-2">
                {articles.length === 0 ? (
                  <div className="alert alert-warning text-center" role="alert">
                    <h4>
                      <strong>¡No hay posts registrados!.</strong>
                    </h4>
                    <p>
                      <strong>
                        En caso de NO poder registrar un post, favor de
                        comunicarlo al equipo de TI.
                      </strong>
                    </p>
                  </div>
                ) : (
                  articles
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map(
                      ({
                        id,
                        title,
                        description,
                        imageUrl,
                        category,
                        createdAt,
                        createdBy,
                        userId,
                        comments,
                      }) => (
                        <div className="card">
                          <div className="card-body">
                            <div className="card-header center">
                              <Link to={`/Post/${id}`}>
                                <img
                                  src={imageUrl}
                                  alt="title"
                                  className="img-thumbnail"
                                />
                              </Link>
                            </div>
                            <div className="card-body">
                              <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                  <h1
                                    className="accordion-header"
                                    id="headingOne"
                                  >
                                    <button
                                      className="accordion-button"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseOne"
                                      aria-expanded="true"
                                      aria-controls="collapseOne"
                                    >
                                      <h5>{title}</h5>
                                    </button>
                                  </h1>
                                  <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <h5>Categoría</h5>
                                      <p className="card-text">{category}</p>
                                      <h5>Descripción:</h5>
                                      <p className="card-text">{description}</p>
                                      <h5>Creador por:</h5>
                                      <p className="card-text">{createdBy}</p>
                                      <h5>Total comentarios:</h5>
                                      <p className="card-text">
                                        {comments && comments.length > 0 && (
                                          <div className="pe-2">
                                            <p>
                                              {comments?.length} Comentario(s)
                                            </p>
                                          </div>
                                        )}
                                      </p>
                                      {user && user.uid === userId && (
                                        <DeleteArticle
                                          id={id}
                                          imageUrl={imageUrl}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card-footer">
                              <p>
                                Fecha de creacion:
                                <br />
                                {createdAt.toDate().toDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )
                )}
              </div>
              <div className="col-12 pt-3">
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

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="addModalLabel">
                Añadir post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <AddPost />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
