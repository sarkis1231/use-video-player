# use-video-player
>custom react hook helps you to build custome video player
 
## Install

```sh
yarn add use-video-player
```

## Usage
All you need is to pass videoElement ref as a parameter

```js
     const videoElement = useRef(null);
     const {
      playerState,
      togglePlay,
      handleOnTimeUpdate,
      handleVideoProgress,
      handleVideoSpeed,
      toggleMute,
    } = useVideoPlayer(videoElement);
```
