import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic} from "@fortawesome/free-solid-svg-icons";


const Nav = ({ setLibraryStatus, libraryStatus }) => {
  const openLibraryHandler = () => {
    setLibraryStatus(!libraryStatus);
  };
  const [opacity, setOpacity] = useState(1);

  const wrapperfunction = () => {
    openLibraryHandler();
    setOpacity( opacity === 1 ? 0 : 1 );
  }
  
  return (
    <nav>
      <h1 className="hidden" style={{ opacity }}>React Beats</h1>
      <button
        className={libraryStatus ? "library-active" : ""}
        onClick={wrapperfunction} 
      >
        {libraryStatus === false ? "PlayList" : "Close PlayList"  }
        {libraryStatus === false ? <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon> : ""}
      </button>
    </nav>

  );
};

export default Nav;