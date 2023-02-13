import Avatar from "@mui/material/Avatar";
import moment from "moment";
import "./DiscussionListItem.css"

export default function DiscussionListItem({
  title,
  timestamp,
  name,
  avatar,
  count,
}) {
  return (
    <div className="discussion-list-item">
      <div className="avatar">
        <Avatar alt={name} src={avatar} />
      </div>
      <div className="details">
        <h3 className="title">{title}</h3>
        <p className="timestamp">{moment(timestamp).fromNow()}</p>
        <p className="name">{name}</p>
      </div>
      <div className="count"><i className="fa-solid fa-comment">{count}</i></div>
    </div>
  );
}
