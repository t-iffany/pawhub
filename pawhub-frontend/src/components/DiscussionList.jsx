import Buttons from "./Buttons";
import DiscussionListItem from "./DiscussionListItem";
import SimpleContainer from "./SimpleContainer";

export default function DiscussionList() {
  return (
    <div className="discussion-list">
      <div className="buttons">
        <Buttons variant="outlined">Swap</Buttons>
        <Buttons variant="outlined">Meetup</Buttons>
        <Buttons variant="outlined">Other</Buttons>
      </div>

      <SimpleContainer>
        <DiscussionListItem />
      </SimpleContainer>
    </div>
  );
}
