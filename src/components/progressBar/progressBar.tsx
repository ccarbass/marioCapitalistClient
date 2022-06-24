import React from "react";
import PropTypes from "prop-types";

type Props = {
  completed: number;
  color: string;
  animation: number;
  height: number | string;
};

const Progress = ({ completed, color, animation, height }: Props) => {

  return (
    <div className={"progressbar-container"}>
      <div
        className="progressbar-progress"
        style={{
          backgroundColor: color,
          width: completed + "%",
          transition: `width ${animation}ms`,
          height: height,
          borderRadius: '20px'
        }}
      ></div>
    </div>
  );
};

export default Progress;
