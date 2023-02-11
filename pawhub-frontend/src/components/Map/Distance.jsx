import Card from "react-bootstrap/Card";

export default function Distance(props) {
  console.log(props.leg);

  // Making address into a google maps url query
  let address = props.leg.end_address.replace(/ /g, "+");
  let mapsUrl = "https://www.google.com/maps/place/" + address;

  // steps to get to the location - an array
  let steps = props.leg.steps;

  if (!props.leg.distance || !props.leg.duration) {
    return null;
  }

  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>Directions</Card.Title>
        <Card.Text>
          This store is {props.leg.distance.text} away, and would take you{" "}
          {props.leg.duration.text} to drive there.
        </Card.Text>
        {steps.map((step, index) => (
          <p key={index}>
            {index + 1}:{" "}
            {index === steps.length - 1
              ? step.instructions
                  .replace(/<\/?b>/g, "")
                  .replace(
                    /<div style="font-size:0.9em">/g,
                    `. After ${step.distance.text}, the `
                  )
                  .replace(/<\/div>/g, ". ")
                  .replace("D", "d")
              : step.instructions
                  .replace(/<\/?b>/g, "")
                  .replace(/<div style="font-size:0.9em">/g, `.`)
                  .replace(/<\/div>/g, " ")}
            {index !== steps.length - 1 &&
              `, and drive for ${step.distance.text}.`}
          </p>
        ))}
        <Card.Link href={mapsUrl} target="_blank">
          View on Google Maps
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
