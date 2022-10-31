import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../../Indexes/AtomsIndexes";
import * as Routing from "../../../../assets/javascript/constants/routing/routing";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config";
import Comment from "./Comment";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "tasks", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 posts-left center">
            <h1 className="text-center">Post</h1>
            <Link to={Routing.Posts}>
              <Button
                type="button"
                className="btn btn-open"
                text="Regresar al blog"
              />
            </Link>
          </div>
          <div className="col-12 posts-right"></div>
          <div className="col-12 posts-bottom">
            {article && (
              <div className="card mt-5" key={id}>
                <div className="card-body">
                  <div className="card-header">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="img-thumbnail"
                    />
                  </div>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h1 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <h5>{article.title}</h5>
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
                          <p className="card-text">{article.category}</p>
                          <h5>Descripción:</h5>
                          <p className="card-text">{article.description}</p>
                          <h5>Creador por:</h5>
                          <p className="card-text">{article.createdBy}</p>
                        </div>
                      </div>
                    </div>
                    <Comment id={article.id} />
                  </div>
                  <div className="card-footer">
                    <p>{article.createdAt.toDate().toDateString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
