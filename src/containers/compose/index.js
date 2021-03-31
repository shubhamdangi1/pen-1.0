import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/user";
import Signin from "../Signin";
import Button from "@material-ui/core/Button";
import "./style.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import makeid from "../../algo/algo";
import { db, storage } from "../../firebase";
import firebase from "firebase";

export default function Compose() {
  const [user, setUser] = useContext(UserContext).user;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgess] = useState(0);

  // to upload the image at firetore, genereate download url
  function handleUpload() {
    if (image) {
      var imageName = makeid(10);
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function show upload %

          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgess(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          //get the download url and upload post info

          storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                photoUrl: imageUrl,
                username: user.email.replace("@gmail.com", ""),
                profileUrl: user.photoURL,
              });
            });

          setCaption("");
          setProgess(0);
          setImage(null);

          document.getElementById("imagePreview").style.display = "none";
        }
      );
    }
  }

  // to take the image and preview it in upload section
  function handleChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      var SelectedImageSRC = URL.createObjectURL(e.target.files[0]);

      var imagePreview = document.getElementById("imagePreview");

      imagePreview.src = SelectedImageSRC;
      imagePreview.style.display = "block";
    }
  }

  return (
    <div className="compose">
      {user ? (
        <div className="compose__loggedin">
          <p>Publish</p>

          <div className="compose__loggedinCentre">
            <textarea
              className="compose__text"
              rows="8"
              placeholder="enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </div>
          <div className="composeImage">
            <img id="imagePreview" alt="" />
          </div>
          <div className="composeBottom">
            <div className="compose__file">
              <Button>
                <label htmlFor="fileinput">
                  <AddAPhotoIcon />
                </label>
              </Button>
              <input
                id="fileinput"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <Button
              onClick={handleUpload}
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!caption}
            >
              Upload {progress != 0 ? progress : ""}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Signin />
        </div>
      )}
    </div>
  );
}
