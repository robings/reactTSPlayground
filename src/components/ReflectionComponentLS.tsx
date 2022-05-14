import { useEffect, useState } from "react";
import "../App.css";

const ReflectionComponent = function ReflectionComponent(props: {
  requestClose: () => void;
}) {
  const { requestClose } = props;
  const [display, setDisplay] = useState<string>("");

  useEffect(() => {
    setDisplay(localStorage.getItem("toDisplay") || "");
    window.addEventListener("storage", () =>
      setDisplay(localStorage.getItem("toDisplay") || "")
    );
    window.addEventListener("beforeunload", () =>
      localStorage.setItem("windowClosed", "true")
    );

    return () => {
      window.removeEventListener("storage", () =>
        setDisplay(localStorage.getItem("toDisplay") || "")
      );
      window.removeEventListener("beforeunload", () =>
        localStorage.setItem("windowClosed", "true")
      );
    };
  }, []);

  const handleClose = () => {
    localStorage.setItem("windowClosed", "true");
    requestClose();
  };

  return (
    <>
      <h2>Reflection Component</h2>
      <p>{display}</p>
      <button onClick={handleClose}>Close</button>
    </>
  );
};

export default ReflectionComponent;
