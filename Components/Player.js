import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause, faStepBackward, faStepForward
   } from '@fortawesome/free-solid-svg-icons'
import { playAudio } from '../util'


const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo, songs, setCurrentSong, setSongs}) => {


    // useEffect(() => {

    //     // adding active state everytime we change the current song
    //     const newSong = songs.map((song) => {
    //         if(song.id === currentSong.id) {
    //             return {
    //                 ...song, //spread everything in song to access active
    //                 active: true,
    //             }
    //         } else {
    //             return {
    //                 ...song,
    //                 active: false,
    //             }
    //         }
    //     })
    //     setSongs(newSong)

    // }, [currentSong])


//Avoid re rendering the state with the function instead of useEffect
   const activeLibraryHandler = (nextPrev) => {
        // adding active state everytime we change the current song
        const newSong = songs.map((song) => {
            if(song.id === nextPrev.id) {
                return {
                    ...song, //spread everything in song to access active
                    active: true,
                }
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        })
        setSongs(newSong)
    }

  const skipTrackHandler = async (direction) => {
     let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
     if (direction === "skip-forward") {
         await setCurrentSong(songs[(currentIndex + 1) % songs.length] );
         activeLibraryHandler(songs[(currentIndex + 1) % songs.length] );
     }
     if (direction === "skip-back") {

        //check first if the index is -1
         if ((currentIndex - 1) % songs.length === -1) {
         await setCurrentSong(songs[songs.length -1]); //returns X songs and beign an array sets the song to the last one
         activeLibraryHandler(songs[songs.length -1])
            return; // we add return to avoid get the line 21 executed
         }
       await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
       activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  }
    
    const playSongHandler = () => {
        //grabbing specific html tag like document.querySelector('audio') with useRef
        console.log(audioRef.current)
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        }
        else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    function getTime(time) {
        return (
          Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
      }


    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({ ...songInfo, currentTime: e.target.value })  //...songinfo add everythings was inside the state

    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                type="range" 
                min={0} 
                max={songInfo.duration} 
                value={songInfo.currentTime}
                onChange={dragHandler} />
               <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faStepBackward}
                onClick={() => skipTrackHandler("skip-back")}/>
                <FontAwesomeIcon 
                className="play" 
                size="2x" 
                icon={isPlaying ? faPause : faPlay} 
                onClick={playSongHandler}/>
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faStepForward}
                onClick={() => skipTrackHandler("skip-forward")}/>
            </div>
            
        </div>
    )
}

export default Player
