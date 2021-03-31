import Button from "@material-ui/core/Button";
import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebase";
import "./style.css";

export default function CommentInput({ comments, id }) {
  const [user, setUser] = useContext(UserContext).user;
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState(comments ? comments : []);

  const addComment = () => {
    if (comment != "") {
      // add comment to the post info
      commentArray.push({
        comment: comment,
        username: user.email.replace("@gmail.com", "").toLowerCase(),
      });

      db.collection("posts")
        .doc(id)
        .update({
          comments: commentArray,
        })
        .then(function () {
          setComment("");
          console.log("comment added");
        })
        .catch(function (error) {
          console.log(`error ${error}`);
        });
    }
  };

  return (
    <div className="commentInput">
      <textarea
        placeholder="write a comment"
        row="1"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="commentTexta"
      ></textarea>
      <Button onClick={addComment} className="commentBtn">
        add comment
      </Button>
    </div>
  );
}
