import React, { JSXElementConstructor, ReactElement, useState } from "react";

import HoverButton from "./IconDelete.svg";
import NextImage from "./add-button.png";

type ILineFormRepeater = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  responsive?: boolean;
};

const LineFormRepeater = ({ children, responsive }: ILineFormRepeater) => {
  const [fields, setFields] = useState([0]); // Initial field

  const addField = () => {
    setFields([...fields, fields.length]);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((field) => field !== index);
    setFields(updatedFields);
  };

  return (
    <div>
      {fields.map((fieldIndex, idx) => (
        <div
        className="mb-4 flex items-center"
          key={fieldIndex}
        >
            <>
              <div style={{ marginRight: "10px" }}>
                {HoverButton}
                <div
                  className="focus:shadow-outline-blue rounded-full bg-gray-400 px-4 py-2 text-white focus:outline-none mb-20 "
                  onClick={() => removeField(fieldIndex)}
                >
                  {idx + 1}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                {React.cloneElement(children, { index: fieldIndex })}
              </div>{" "}
            </>
        </div>
      ))}
      <button
        className="flex w-full items-center text-lg "
        // className='focus:shadow-outline-blue rounded-full bg-black px-4 py-2 text-white focus:outline-none '
        onClick={() => addField()}
      >
        {NextImage}
      </button>
    </div>
  );
};

export default LineFormRepeater;
