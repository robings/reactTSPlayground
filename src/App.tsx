import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
// import { Link } from "react-router-dom";
import "./App.css";
import appStrings from "./app.strings";
import AnimatedDropdown from "./components/AnimatedDropdown";
// import ReflectionComponent from "./components/ReflectionComponent";
// import RenderInWindow from "./components/RenderInWindow";
import RenderInWindowLinked from "./components/RenderInWindowLinked";

function App() {
  const [open, setOpen] = useState<boolean>(true);
  const [closed, setClosed] = useState<boolean>(true);
  const [rendered, setRendered] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [reflectionComponentWindowOpen, setReflectionComponentWindowOpen] =
    useState<boolean>(false);

  const onMinimise = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setClosed(true);
    setTimeout(() => {
      setOpen(true);
      setRendered(false);
    }, 300);
  };

  const onOpenTopSheet = () => {
    setRendered(true);
    setTimeout(() => setClosed(false), 0);
  };

  const openWindow = () => {
    localStorage.setItem("toDisplay", "First Display");
    setReflectionComponentWindowOpen(true);
  };

  const changeDisplay = (toDisplay: string) => {
    localStorage.setItem("toDisplay", toDisplay);
  };

  useEffect(() => {
    const onStorageChange = () => {
      if (localStorage.getItem("windowClosed") === "true") {
        setReflectionComponentWindowOpen(false);
        localStorage.removeItem("windowClosed");
      }
    };

    window.addEventListener("storage", () => onStorageChange());

    return () => window.removeEventListener("storage", () => onStorageChange());
  }, []);

  return (
    <div className="App">
      <header className="appHeader">
        <h1>{appStrings.title}</h1>
        <div>
          <button type="button" onClick={onOpenTopSheet} disabled={!closed}>
            {appStrings.openTopSheet}
          </button>
          <button
            type="button"
            onClick={() => setModalIsOpen(true)}
            disabled={modalIsOpen}
          >
            {appStrings.openModal}
          </button>
        </div>
      </header>
      {/* <Link to="/reflection" target="_blank" rel="noopener noreferrer">
        Reflection Component
      </Link> */}
      <button type="button" onClick={openWindow}>
        Reflection component in window
      </button>
      <Formik
        initialValues={{ displayInput: "" }}
        onSubmit={(values) => changeDisplay(values.displayInput)}
      >
        <Form>
          <Field input name="displayInput" id="displayInput" />
          <button type="submit">Change display in other window</button>
        </Form>
      </Formik>
      {rendered && (
        <AnimatedDropdown
          open={open}
          closed={closed}
          onMinimise={onMinimise}
          onClose={onClose}
        />
      )}
      <ReactModal
        isOpen={modalIsOpen}
        className="modalContent"
        closeTimeoutMS={300}
        shouldCloseOnOverlayClick
        onRequestClose={() => setModalIsOpen(false)}
      >
        <header>
          <h2>{appStrings.modal.title}</h2>
          <button type="button" onClick={() => setModalIsOpen(false)}>
            {appStrings.close}
          </button>
        </header>
        <section>
          <div>Some random modal text</div>
          <div className="inputGroup">
            <label>Modal Input</label>
            <input type="text" />
          </div>
          <button
            type="button"
            onClick={() => setModalIsOpen(false)}
            className="bottomRight"
          >
            {appStrings.modal.closeButton}
          </button>
        </section>
      </ReactModal>
      {reflectionComponentWindowOpen && (
        // <RenderInWindow>
        //   <ReflectionComponent
        //     requestClose={() => setReflectionComponentWindowOpen(false)}
        //     toDisplay={newWindowDisplay}
        //   />
        // </RenderInWindow>
        <RenderInWindowLinked url="/reflection" />
      )}
    </div>
  );
}

export default App;
