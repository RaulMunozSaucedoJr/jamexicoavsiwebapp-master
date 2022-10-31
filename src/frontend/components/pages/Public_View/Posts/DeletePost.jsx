import React from "react";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../../../backend/Firebase/Firebase-config";
import { deleteObject, ref } from "firebase/storage";

const DeleteArticle = ({ id, imageUrl }) => {
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
        Borar post
      </button>
    </div>
  );
};

export default DeleteArticle;
