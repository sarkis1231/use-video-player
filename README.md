# use-video-player

# use-video-player
>custom react hook helps you to build custome video player
 
## Install

```sh
yarn add use-video-player
```

## Usage

```jsx
import React from 'react';
import {useHideScrollbar} from "use-hide-scrollbar";
const App = () => {

  const [trigger, setTrigger] = useState(false);
  useHideScrollbar(trigger);
  console.log(trigger)
  return (
    <div>
      <button onClick={() => setTrigger(prev => !prev)}>Click me!</button>
    </div>
  );
}
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
