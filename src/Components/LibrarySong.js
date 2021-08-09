import React from 'react'
import { playAudio } from '../util';

const LibrarySong = ({ song , songs, setCurrentSong, audioRef, audio, isPlaying, setSongs}) => {

    const songSelectHandler = () => {
        const selectedSong = songs.filter((songFromState) => songFromState.id === song.id);
        //filters return array with just 1 element so we need to access to this element with [0]
        const id = selectedSong[0].id
        // console.log(id)
        // console.log(selectedSong)
        setCurrentSong(selectedSong[0])
       
        // setCurrentSong(song)
        // console.log(song)
        //changing active state
        

        playAudio(isPlaying, audioRef)

        }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
             <img src={song.cover} alt="song cover" />
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
            
        </div>
    )
}

export default LibrarySong
