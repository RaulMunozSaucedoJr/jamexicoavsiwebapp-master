import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../backend/Firebase/Firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../../../../backend/Firebase/Firebase-config";

const Comment = ({ id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(db, "tasks", id);
  useEffect(() => {
    const docRef = doc(db, "tasks", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
    // eslint-disable-next-line
  }, []);

  const handleChangeComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userName: currentlyLoggedinUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    console.log(comment);
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
     <h3> Comentarios:</h3>
      <div className="container">
        {comments !== null &&
          comments.map(({ commentId, user, comment, userName, createdAt }) => (
            <div key={commentId}>
              <div className="border p-2 mt-2 row">
                <div className="col-12">
                  <span
                    className={`badge ${
                      user === currentlyLoggedinUser.uid
                        ? "text-bg-success"
                        : "text-bg-light"
                    }`}
                  >
                    {userName}
                  </span>
                  {comment}
                </div>
                <div className="col-12">
                  {user === currentlyLoggedinUser.uid && (
                    <button
                      className="btn btn-delete"
                      onClick={() =>
                        handleDeleteComment({
                          commentId,
                          user,
                          comment,
                          userName,
                          createdAt,
                        })
                      }
                    >
                      Eliminar comentario
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        {currentlyLoggedinUser && (
          <input
            type="text"
            className="form-control mt-2"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Añade un comentario"
            onKeyUp={(e) => {
              handleChangeComment(e);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
