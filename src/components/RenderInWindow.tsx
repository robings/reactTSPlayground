import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const copyStyles = (src: Document, dest: Document) => {
  Array.from(src.styleSheets).forEach((styleSheet) => {
    dest.head.appendChild((styleSheet.ownerNode as Element).cloneNode(true));
  });
  Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
};

// https://stackoverflow.com/questions/47574490/open-a-component-in-new-window-on-a-click-in-react
const RenderInWindow = function RenderInWindow(props: { children: ReactNode }) {
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
        "",
        "",
        "width=600, height=600, left=200, top=200"
      );

      // Append container
      (
        newWindow as React.MutableRefObject<Window>
      ).current.document.body.appendChild(container);

      // Save window reference for cleanup
      const curWindow = newWindow.current;

      copyStyles(window.document, (curWindow as Window).document);
      if (curWindow) {
        curWindow.document.title = "Window Title";
      }

      // Return clean up function
      return () => (curWindow as Window).close();
    }
  }, [container]);

  return container && createPortal(props.children, container);
};

export default RenderInWindow;
