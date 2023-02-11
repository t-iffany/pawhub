export default function Distance(props) {
  console.log(props.leg);

  if (!props.leg.distance || !props.leg.duration) {
    return null;
  }

  return (
    <div>
      <div>Distance:</div>
      <div>
        This store is {props.leg.distance.text} away, and would take you{" "}
        {props.leg.duration.text} to drive there.
      </div>
    </div>
  );
}
