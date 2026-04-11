import "../App.css";

const ReflectionComponent = function ReflectionComponent(props: {
  requestClose: () => void;
  toDisplay: string;
}) {
  const { requestClose, toDisplay } = props;

  return (
    <>
      <h2>Reflection Component</h2>
      <p>{toDisplay}</p>
      <button onClick={() => requestClose()}>Close</button>
    </>
  );
};

export default ReflectionComponent;
