import appStrings from "../app.strings";

const AnimatedDropdown = function AnimatedDropdown(props: {
  open: boolean;
  closed: boolean;
  onMinimise: () => void;
  onClose: () => void;
}) {
  const { open, closed, onMinimise, onClose } = props;

  return (
    <div
      className={`dropdown ${closed ? "dropdownInvisible" : "dropdownVisible"}`}
    >
      <header>
        <h2>{appStrings.topSheet.title}</h2>
        <button type="button" onClick={onClose}>
          X
        </button>
        <button type="button" onClick={onMinimise}>
          {open
            ? appStrings.topSheet.minimiseButton
            : appStrings.topSheet.maximiseButton}
        </button>
      </header>
      <div
        className={`dropdownContents ${
          open ? "dropdownContentsVisible" : "dropdownContentsHidden"
        }`}
      >
        {/* react testing library doesn't appear to recognise the implicit form role */}
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <form role="form">
          <div className="inputGroup">
            <label htmlFor="input1">{appStrings.topSheet.input1}</label>
            <input type="text" id="input1" name="input1"></input>
          </div>
          <div className="inputGroup">
            <label htmlFor="input2">{appStrings.topSheet.input2}</label>
            <input type="text" id="input2" name="input2"></input>
          </div>
          <div className="buttonGroup">
            <button type="button" onClick={onClose}>
              {appStrings.topSheet.cancelButton}
            </button>
            <div>
              <button type="button" onClick={onClose}>
                {appStrings.topSheet.anotherButton}
              </button>
              <button type="submit" onClick={onClose}>
                {appStrings.topSheet.submitButton}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimatedDropdown;
