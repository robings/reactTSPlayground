import { useState } from "react";
import ReactModal from "react-modal";
import "./App.css";
import appStrings from "./app.strings";
import AnimatedDropdown from "./components/AnimatedDropdown";

function App() {
  const [open, setOpen] = useState<boolean>(true);
  const [closed, setClosed] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const onMinimise = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setClosed(!closed);
    if (!closed) {
      setTimeout(() => setOpen(true), 300);
    }
  };

  return (
    <div className="App">
      <header className="appHeader">
        <h1>{appStrings.title}</h1>
        <div>
          <button type="button" onClick={onClose} disabled={!closed}>
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
      <AnimatedDropdown
        open={open}
        closed={closed}
        onMinimise={onMinimise}
        onClose={onClose}
      />
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
