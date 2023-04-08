export default function Answer(props) {
  return (
    <div>
      <button onClick={props.onButtonClick}>
        {props.index}. {props.value}
      </button>
    </div>
  );
}
