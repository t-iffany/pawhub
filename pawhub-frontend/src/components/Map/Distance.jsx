import Card from "react-bootstrap/Card";

export default function Distance(props) {
  // console.log(props.leg);

  // Making address into a google maps url query
  let address = props.leg.end_address.replace(/ /g, "+");
  let mapsUrl = "https://www.google.com/maps/place/" + address;

  if (!props.leg.distance || !props.leg.duration) {
    return null;
  }

  return (
    <Card style={{ width: "15em" }}>
      <Card.Body>
        <Card.Title>Distance</Card.Title>
        <Card.Text>
          This store is {props.leg.distance.text} away, and would take you{" "}
          {props.leg.duration.text} to drive there.
        </Card.Text>
        <Card.Link href={mapsUrl} target="_blank">
          View on Google Maps
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
