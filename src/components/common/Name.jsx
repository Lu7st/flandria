import React from "react";
import styled from "styled-components";

const monsterColors = {
  0: "#ffffff",
  1: "#7fce2e",
  2: "#cf304e",
  3: "#e7b23f"
}

const itemColors = {
  0: "#99ccff",
  1: "#99e680",
  2: "#e6cc99",
  3: "#ffbd8f"
}

const NameWrapper = styled.span`
  letter-spacing: 1.1px;
  font-size: ${props => props.title ? "24px" : "16px"};
  color: ${props => {
    switch (props.tablename) {
      case "monster":
        return monsterColors[props.val];
      case "quest":
        return "#fff";
      default: // items
        return itemColors[props.val];
    }
  }} !important;
`


const Name = ({tablename, data, title = false}) => {
  let val = Object.is(data.rare_grade, undefined) ? data.rating_type : data.rare_grade;

  if (tablename == "product_book" && !typeof data.production === "undefined") {
    // In overview, the rare grade is taken from result item
    val = data.production.result_item.rare_grade;
  }

  return (
    <NameWrapper title={title} tablename={tablename} val={val}>
      {data.name}
    </NameWrapper>
  )
}

export default Name;