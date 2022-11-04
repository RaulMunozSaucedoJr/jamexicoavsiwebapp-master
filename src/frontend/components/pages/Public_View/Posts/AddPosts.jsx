/* Importing the necessary libraries to use the functions. */
import React, { useState } from "react";
import Swal from "sweetalert2";
import * as Regex from "../../../../assets/javascript/regexs/regexs";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  storage,
  db,
  auth,
} from "../../../../../backend/Firebase/Firebase-config";

/* A hook that allows you to use the state of the user. */
import { useAuthState } from "react-firebase-hooks/auth";

/* A function that allows you to add a post to the database. */
const AddPosts = () => {
  /* A hook that allows you to use the state of the user. */
  const [user] = useAuthState(auth);
  /* A hook that allows you to use the state of the user. */
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  /* A hook that allows you to use the state of the user. */
  const [progress, setProgress] = useState(0);

  /**
   * When the user types in the input field, the handleChange function is called, which updates the
   * formData state with the new value of the input field.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * When the user selects an image, set the image property of the formData object to the image the user
   * selected.
   */
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  /**
   * It uploads an image to firebase storage and then uploads the image url to firestore.
   * </code>
   * @returns the following:
   */
  const handlePublish = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.image
    ) {
      Swal.fire({
        title: "¡Atención!",
        icon: "info",
        text: "Ningún campo debe estar vacio",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
    if (
      !formData.title.match(Regex.Letters) ||
      !formData.description.match(Regex.Letters)
    ) {
      Swal.fire({
        title: "¡Atención!",
        icon: "info",
        text: "Ninguno de estos campos acepta carácteres especiales y/o números.",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          category: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "tasks");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              Swal.fire({
                title: "¡Éxito!",
                icon: "success",
                text: "Se ha registrado correctamente el post",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
              });
              setProgress(0);
            })
            .catch((err) => {
              Swal.fire({
                title: "¡Atención!",
                icon: "error",
                text: "No se ha podido registrar el post",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2500,
              });
            });
        });
      }
    );
  };

  return (
    <div>
      {!user ? (
        <></>
      ) : (
        <>
          <div className="form-group pt-3">
            <label htmlFor="title">Titulo</label>
            <input
              type="text"
              name="title"
              placeholder="Titulo"
              className="form-control"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group pt-3">
            <label htmlFor="">Descripción:</label>
            <textarea
              name="description"
              placeholder="Descripcion"
              className="form-control"
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group pt-3">
            <label htmlFor="category">Categoría</label>
            <select
              className="form-select"
              name="category"
              id="category"
              onChange={(e) => handleChange(e)}
              value={formData.category}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Tecnologia">Tecnología</option>
              <option value="Entrevistas">Entrevistas</option>
              <option value="Documentacion">Documentaciòn</option>
              <option value="Mentoria">Mentoria</option>
            </select>
          </div>

          <div className="form-group pt-3">
            <label htmlFor="image">Imagen</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="form-control"
              onChange={(e) => handleImageChange(e)}
            />
            {progress === 0 ? null : (
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped "
                  style={{ width: `${progress}%` }}
                >
                  {`uploading image ${progress}%`}
                </div>
              </div>
            )}
          </div>

          <div className="form-grou pt-4">
            <button className="btn btn-submit" onClick={handlePublish}>
              Crear post
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddPosts;
