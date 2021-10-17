import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpOutlined,
  ThumbDownAltOutlined,
} from "@material-ui/icons";
import { useState } from "react";

const ListItem = ({ index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2021/05/25/938590-money-heist.png"
        alt=""
      />

      {isHovered && (
        <>
          <video src={trailer} autoplay muted loop></video>

          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpOutlined className="icon" />
              <ThumbDownAltOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
              <span className="limit">+18</span>
              <span>2012</span>
            </div>
            <div className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              vel fugiat assumenda delectus qui deserunt nisi.
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
