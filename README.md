# use-video-player
>custom react hook helps you to build custome video player
 
## Install

```sh
yarn add use-video-player or npm i use-video-player
```

## Usage
```jsx
 const videoElement = useRef(null);
const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
} = useVideoPlayer(videoElement);


return (
    <div>
        <div>
            <video
                src={src}
                ref={videoElement}
                onTimeUpdate={handleOnTimeUpdate}
            />
            <div>
                <button onClick={togglePlay}>
                    {!playerState.isPlaying ? (
                        <span>Play</span>
                    ) : (
                        <span>Pause</span>
                    )}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={playerState.progress}
                    onChange={(e) => handleVideoProgress(e)}
                />
                <select
                    value={playerState.speed}
                    onChange={(e) => handleVideoSpeed(e)}
                >
                    <option value="0.50">0.50x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="2">2x</option>
                </select>
                <button onClick={toggleMute}>
                    {!playerState.isMuted ? (
                        <span>Mute</span>
                    ) : (
                        <span>Unmute</span>
                    )}
                </button>
            </div>
        </div>
    </div>
);
```

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

## Metadata
package on npm [https://npmjs.com/package/use-video-player-hook](https://npmjs.com/package/use-video-player-hook)

## Show your support

Give a ⭐️ if this project helped you!
