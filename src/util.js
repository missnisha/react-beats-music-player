export const playAudio = (isPlaying, audioRef) => {
    //checking if is playing the song already
    if (isPlaying) {
        const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
        playPromise.then((audio) => {
            audioRef.current.play();
        })
        
        }
    }
}