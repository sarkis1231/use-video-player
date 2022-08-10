import {RefObject, useEffect, useState} from 'react';

type TState = {
    isPlaying: boolean,
    progress: number,
    speed: number,
    isMuted: boolean
}

export const useVideoPlayer = (videoElement: RefObject<HTMLVideoElement>) => {

    const [playerState, setPlayerState] = useState<TState>(() => ({
        isPlaying: false,
        progress: 0,
        speed: 1,
        isMuted: false,
    }));

    // const [isPlaying, setIsPlaying] = useState(false)


    const togglePlay = () => {
        setPlayerState(({isPlaying, ...prev}) => ({
            ...prev,
            isPlaying,
        }));
    };

    useEffect(() => {
        playerState.isPlaying
            ? videoElement?.current?.play()
            : videoElement?.current?.pause();
    }, [playerState.isPlaying, videoElement]);

    const handleOnTimeUpdate = () => {
        const progress = (videoElement!.current!.currentTime / videoElement!.current!.duration) * 100;
        setPlayerState(prev => ({
            ...prev,
            progress,
        }));
    };

    const handleVideoProgress = (event: any) => {
        const manualChange = Number(event.target.value);
        if (videoElement?.current) {
            videoElement.current.currentTime = (videoElement?.current?.duration / 100) * manualChange;
        }

        setPlayerState(prev => ({
            ...prev,
            progress: manualChange,
        }));
    };

    const handleVideoSpeed = (event: any) => {
        const speed = Number(event.target.value);
        if (videoElement?.current) {
            videoElement.current.playbackRate = speed;
        }
        setPlayerState(prev => ({
            ...prev,
            speed,
        }));
    };


    const toggleMute = () => {
        setPlayerState(({isMuted, ...prev}) => ({
            ...prev,
            isMuted
        }));
    };

    useEffect(() => {
        if (videoElement?.current) {
            playerState.isMuted
                ? (videoElement.current.muted = true)
                : (videoElement.current.muted = false);
        }
    }, [playerState.isMuted, videoElement]);

    return {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
    };
};