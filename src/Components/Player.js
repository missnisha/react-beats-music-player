import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause,
    faVolumeDown, } from '@fortawesome/free-solid-svg-icons'
import { playAudio } from '../util'


const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo, songs, setCurrentSong, setSongs}) => {


    useEffect(() => {

        // adding active state everytime we change the current song
        const newSong = songs.map((song) => {
            if(song.id === currentSong.id) {
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

    }, [currentSong])

  const skipTrackHandler = (direction) => {
     let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
     if (direction === "skip-forward") {
         setCurrentSong(songs[(currentIndex + 1) % songs.length]  );
     }
     if (direction === "skip-back") {

        //check first if the index is -1
         if ((currentIndex - 1) % songs.length === -1) {
            setCurrentSong(songs[songs.length -1]  ); //returns X songs and beign an array sets the song to the last one
            playAudio(isPlaying, audioRef)
            return; // we add return to avoid get the line 21 executed
         }
        setCurrentSong(songs[(currentIndex - 1) % songs.length]  );
    }
  
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
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}
                onClick={() => skipTrackHandler("skip-back")}/>
                <FontAwesomeIcon 
                className="play" 
                size="2x" 
                icon={isPlaying ? faPause : faPlay} 
                onClick={playSongHandler}/>
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight}
                onClick={() => skipTrackHandler("skip-forward")}/>
            </div>
            
        </div>
    )
}

export default Player
