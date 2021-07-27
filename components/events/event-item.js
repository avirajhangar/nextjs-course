import Link from "next/link";
import classes from "./event-item.module.css";
import Button from "../ui/button";

function EventItem(props) {
  const { title, image, date, location, id } = props;
  const readableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const exploreLink = `/events/${id}`;
  const formattedAddress = location.replace(", ", "\n");
  return (
    <li className={classes.item}>
      <img className={classes.bg} src={"/" + image} alt="" />
      <div className={classes.details}>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{readableDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.links}>
          <Button link={exploreLink}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
