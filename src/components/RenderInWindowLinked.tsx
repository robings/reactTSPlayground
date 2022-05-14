import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// based on https://stackoverflow.com/questions/47574490/open-a-component-in-new-window-on-a-click-in-react
const RenderInWindowLinked = function RenderInWindowLinked(props: {
  url: string;
}) {
  const { url } = props;
  const [container, setContainer] = useState<Element | null>(null);
  const newWindow: React.MutableRefObject<Window | null> = useRef(null);

  useEffect(() => {
    // Create container element
    setContainer(document.createElement("div"));
  }, []);

  useEffect(() => {
    // When container is ready
    if (container) {
      // Create window
      newWindow.current = window.open(
        url,
        "",
        "width=600, height=600, left=200, top=200"
      );

      // Append container
      (
        newWindow as React.MutableRefObject<Window>
      ).current.document.body.appendChild(container);

      // Save window reference for cleanup
      const curWindow = newWindow.current;

      if (curWindow) {
        curWindow.document.title = "Window Title";
      }

      // Return clean up function
      return () => (curWindow as Window).close();
    }
  }, [container]);

  return container && createPortal("", container);
};

export default RenderInWindowLinked;
