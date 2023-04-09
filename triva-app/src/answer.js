import Button from "@mui/material/Button";

export default function Answer(props) {
  return (
    <div>
      <Button variant="outlined" onClick={props.onButtonClick}>
        {props.index}. {props.value}
      </Button>
    </div>
  );
}
