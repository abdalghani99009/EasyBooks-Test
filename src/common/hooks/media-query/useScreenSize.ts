import { useState, useCallback, useEffect } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const onSizeChanged = useCallback(() => {
    setScreenSize(getScreenSize());
  }, []);

  useEffect(() => {
    subscribe(onSizeChanged);

    return () => {
      unsubscribe(onSizeChanged);
    };
  }, [onSizeChanged]);

  return screenSize;
};

let handlers: any[] = [];
const smallMedia = window.matchMedia("(max-width: 640px )");
const mediumMedia = window.matchMedia("(max-width: 768px)");
const largeMedia = window.matchMedia("(min-width: 1024px)");

[smallMedia, mediumMedia, largeMedia].forEach((media) => {
  media.addListener((e) => {
    e.matches && handlers.forEach((handler) => handler());
  });
});

const subscribe = (handler: () => void) => handlers.push(handler);

const unsubscribe = (handler: () => void) => {
  handlers = handlers.filter((item) => item !== handler);
};

function getScreenSize() {
  return {
    isSmall: smallMedia.matches,
    isMedium: mediumMedia.matches,
    isLarge: largeMedia.matches,
  };
}
