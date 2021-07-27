import Button from "../ui/button";
import classes from "./events-search.module.css";
import { useRef } from "react";

function EventsSearch(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const selecttedYear = yearInputRef.current.value;
    const selecttedMonth = monthInputRef.current.value;

    props.onSearch(selecttedYear, selecttedMonth);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">month</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">Jan</option>
            <option value="2">feb</option>
            <option value="3">mar</option>
            <option value="4">avr</option>
            <option value="5">may</option>
            <option value="6">jun</option>
            <option value="7">jul</option>
            <option value="8">aug</option>
            <option value="9">sept</option>
            <option value="10">oct</option>
            <option value="11">nov</option>
            <option value="12">dec</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}

export default EventsSearch;
