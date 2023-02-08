import Avatar from "@mui/material/Avatar";
import moment from "moment";

export default function DiscussionListItem({ title, timestamp, name, avatar }) {
  return (
    <div className="discussion-list-item-class">
      <div>
        <Avatar alt={name} src={avatar} />
        <span>{name}</span>
      </div>

      <div>{title}</div>

      <div>
        <div className="post-likes-comments">
          <i className="fa-solid fa-heart">50</i>
          <i className="fa-solid fa-comment">25</i>
        </div>
        <div>{moment(timestamp).fromNow()}</div>
      </div>
    </div>
  );
}
