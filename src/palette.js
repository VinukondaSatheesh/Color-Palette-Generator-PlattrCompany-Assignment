import React from "react";
import "./palette.css";

const Palette = ({ colors, onDelete }) => {
  return (
    <div className="palette">
      <div className="color-row">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-block"
            style={{ backgroundColor: color }}
          >
            <span
              className="hex-code"
              onClick={() => navigator.clipboard.writeText(color)}
            >
              {color}
            </span>
          </div>
        ))}
      </div>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default Palette;
