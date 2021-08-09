import '../src/Sass/App.scss';
import { useState, useRef } from 'react';
import Player from './Components/Player';
import Song from './Components/Song';
import data from './data';
import Library from './Components/Library';
import Nav from './Components/Nav';

function App() {

  //ref
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [ songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
});

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration
    console.log(duration)
    setSongInfo({ ...songInfo, currentTime: current, duration }) //duration: duration being same name is possible to just put duration

}

  return (
    <div className="App">
      <Nav 
      libraryStatus={libraryStatus}
      setLibraryStatus={setLibraryStatus}
      />
      <Song 
      currentSong={currentSong} 
      />
      <Player 
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      currentSong={currentSong} 
      setCurrentSong={setCurrentSong}
      audioRef={audioRef}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      songs={songs}
      setSongs={setSongs}
      />
      <Library 
      isPlaying={isPlaying}
      audioRef={audioRef}
      songs={songs}
      setSongs={setSongs}
      setCurrentSong={setCurrentSong}
      libraryStatus={libraryStatus}
      />
      
      <audio
            onLoadedMetadata={timeUpdateHandler} 
            onTimeUpdate={timeUpdateHandler} //once info song is loaded "fetches" the data
            ref={audioRef} 
            src={currentSong.audio}>
      </audio>

    </div>

  );
}

export default App;
