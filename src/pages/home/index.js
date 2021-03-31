import React from "react";
import { Navbar } from "../../containers";
import Compose from "../../containers/compose";
import Feed from "../../containers/feed";
import "./style.css";
function Home() {
  return (
    <div className="home">
      <Navbar />
      <Compose />
      <Feed />
    </div>
  );
}

export default Home;
