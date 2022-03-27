import { useState } from "react";
import ReactModal from "react-modal";
import "./App.css";
import appStrings from "./app.strings";
import AnimatedDropdown from "./components/AnimatedDropdown";

function App() {
  const [open, setOpen] = useState<boolean>(true);
  const [closed, setClosed] = useState<boolean>(true);
  const [rendered, setRendered] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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
    </div>
  );
}

export default App;
