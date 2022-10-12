import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const DayListItem = (props) => {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = (spotsRemaining) => {
    if (spotsRemaining === 1) {
      return `${spotsRemaining} spot remaining`;
    } else if (spotsRemaining === 0) {
      return `no spots remaining`;
    } else {
      return `${spotsRemaining} spots remaining`
    }
  }

  return (
    <li 
      className={dayClass} onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

export default DayListItem;

// selected={props.selected}