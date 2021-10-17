import "./list.scss";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "./ListItem/ListItem";
import { useRef } from "react";
import { useState } from "react";
const List = () => {
  const listRef = useRef();
  const [slides, setSlides] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
    console.log(isMoved);
    if (direction === "left" && slides > 0) {
      if (slides === 1) {
        setIsMoved(false);
      }
      setSlides(slides - 1);
      listRef.current.style.transform = `translateX(${distance + 230}px)`;
    } else if (direction === "right" && slides < 5) {
      setIsMoved(true);
      setSlides(slides + 1);

      listRef.current.style.transform = `translateX(${distance - 230}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          <ListItem index={0} />
          <ListItem index={1} />
          <ListItem index={2} />
          <ListItem index={3} />
          <ListItem index={4} />
          <ListItem index={5} />
          <ListItem index={6} />
          <ListItem index={7} />
          <ListItem index={8} />
          <ListItem index={9} />
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
