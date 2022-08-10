import {ChangeEvent, RefObject, useEffect, useState} from 'react';

type TState = {
    isPlaying: boolean,
    progress: number,
    speed: number,
    isMuted: boolean
}

type TReturn = {
    playerState: TState;
    togglePlay: () => void;
    handleOnTimeUpdate: () => void;
    handleVideoProgress: (event: ChangeEvent<any>) => void;
    handleVideoSpeed: (event: ChangeEvent<any>) => void;
    toggleMute: () => void;
}

export const useVideoPlayer = (videoElement: RefObject<HTMLVideoElement>) : TReturn => {

    const [playerState, setPlayerState] = useState<TState>(() => ({
        isPlaying: false,
        progress: 0,
        speed: 1,
        isMuted: false,
    }));


    const togglePlay = () => {
        setPlayerState(({isPlaying, ...prev}) => ({
            ...prev,
            isPlaying: !isPlaying,
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

    const handleVideoProgress = (event: ChangeEvent<any>) => {
        const manualChange = Number(event.target.value);
        if (videoElement?.current) {
            videoElement.current.currentTime = (videoElement?.current?.duration / 100) * manualChange;
        }

        setPlayerState(prev => ({
            ...prev,
            progress: manualChange,
        }));
    };

    const handleVideoSpeed = (event: ChangeEvent<any>) => {
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
            isMuted: !isMuted
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