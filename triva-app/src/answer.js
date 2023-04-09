export default function Answer(props) {
  return (
    <div>
      <Button variant="contained" onClick={props.onButtonClick}>
        {props.index}. {props.value}
      </Button>
    </div>
  );
}
