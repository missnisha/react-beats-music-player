import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, l } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ setLibraryStatus, libraryStatus }) => {
  const openLibraryHandler = () => {
    setLibraryStatus(!libraryStatus);
  };

  return (
    <nav>
      <h1>React Beats</h1>
      <button
        className={libraryStatus ? "library-active" : ""}
        onClick={openLibraryHandler}
      >
        {libraryStatus === false ? "PlayList" : "Close PlayList"  }
        {libraryStatus === false ? <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon> : ""}
      </button>
    </nav>
  );
};

export default Nav;