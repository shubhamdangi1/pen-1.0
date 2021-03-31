import React from "react";

export default function Comments({ username, caption }) {
  return (
    <div className="comment">
      <p>
        <span style={{ fontWeight: "bold", marginRight: "4px" }}>
          {username}
        </span>
        {caption}
      </p>
    </div>
  );
}
