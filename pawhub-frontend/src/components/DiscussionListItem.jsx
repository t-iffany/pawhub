import Avatar from "@mui/material/Avatar";

export default function DiscussionListItem() {
  return (
    <div className="discussion-list-item-class">
      <div>
        <Avatar
          alt="Hello World"
          src="https://designoholic.com/wp-content/uploads/2017/07/avatar-rogemon.png"
        />
      </div>

      <div>Food puzzle</div>

      <div>
        <div className="post-likes-comments">
          <i class="fa-solid fa-heart">50</i>
          <i class="fa-solid fa-comment">25</i>
        </div>
        <div>Timestamp</div>
      </div>
    </div>
  );
}
