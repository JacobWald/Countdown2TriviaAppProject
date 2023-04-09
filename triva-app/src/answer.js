export default function Answer(props) {
  return (
    <div>
      <button variant="contained" onClick={props.onButtonClick}>
        {props.index}. {props.value}
      </button>
    </div>
  );
}
