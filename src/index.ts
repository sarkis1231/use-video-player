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

export const useVideoPlayer = (videoElement: RefObject<HTMLVideoElement>): TReturn => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(1);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    useEffect(() => {
        isPlaying
            ? videoElement?.current?.play()
            : videoElement?.current?.pause();
    }, [isPlaying, videoElement]);

    const handleOnTimeUpdate = () => {
        const progress = (videoElement!.current!.currentTime / videoElement!.current!.duration) * 100;
        setProgress(progress);
    };

    const handleVideoProgress = (event: ChangeEvent<any>) => {
        const manualChange = Number(event.target.value);
        if (videoElement?.current) {
            videoElement.current.currentTime = (videoElement?.current?.duration / 100) * manualChange;
        }

        setProgress(manualChange);
    };

    const handleVideoSpeed = (event: ChangeEvent<any>) => {
        const speed = Number(event.target.value);
        if (videoElement?.current) {
            videoElement.current.playbackRate = speed;
        }
        setSpeed(speed);
    };


    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    useEffect(() => {
        if (videoElement?.current) {
            isMuted
                ? (videoElement.current.muted = true)
                : (videoElement.current.muted = false);
        }
    }, [isMuted, videoElement]);

    return {
        playerState: {
            isPlaying,
            progress,
            speed,
            isMuted
        },
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
    };
};