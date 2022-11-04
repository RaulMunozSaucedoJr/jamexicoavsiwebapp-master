import React from "react";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../../../backend/Firebase/Firebase-config";
import { deleteObject, ref } from "firebase/storage";

/**
 * It's a function that deletes a document from a firestore database and an image from a firebase
 * storage.
 * @returns The DeleteArticle component is being returned.
 */
const DeleteArticle = ({ id, imageUrl }) => {
/**
 * When the user clicks the delete button, a confirmation dialog appears, and if the user confirms, the
 * document is deleted from the database and the image is deleted from the storage.
 */
  const handleDelete = async () => {
    await Swal.fire({
      title: "¿Esta seguro de esto?",
      text: "Estos cambios ya no se podrán revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22414e",
      cancelButtonColor: "#c71700",
      confirmButtonText: "¡Si!.",
      cancelButtonText:"Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Eliminado!", "El post se ha eliminado", "success");
        deleteDoc(doc(db, "tasks", id));
        const storageRef = ref(storage, imageUrl);
        deleteObject(storageRef);
      }
    });
  };

  return (
    <div>
      <button className="btn btn-delete" type="button" onClick={handleDelete}>
        Borrar post
      </button>
    </div>
  );
};

export default DeleteArticle;
