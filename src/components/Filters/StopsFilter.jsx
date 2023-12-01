import React from "react";
import CheckboxWithLabel from "../ui/CheckboxWithLabel";

const StopsFilter = ({ flightNo, setFlightNo }) => {
  const stops = [1, 2, 3];

  const handleCheckboxChange = (value) => {
    setFlightNo([value]); // Set the current checkbox as the only checked one
  };

  return (
    <div>
      {stops.map((item, key) => (
        <div key={key} className="flex">
          <CheckboxWithLabel
            value={item}
            id={item + "stop"}
            checked={flightNo[0] === item}
            onChange={() => handleCheckboxChange(item)}
          />
          {item >= 3 ? (
            <label className="mb-3" htmlFor={item + "stop"}>2+</label>
          ) : (
            <label className="mb-3" htmlFor={item + "stop"}>{item}</label>
          )}
        </div>
      ))}
    </div>
  );
};

export default StopsFilter;
