import React, { JSXElementConstructor, ReactElement, useState } from "react";
import IconDelete from "./icon-delete.svg";

type ILineFormRepeater = {
  children: (
    index: number
  ) => ReactElement<any, string | JSXElementConstructor<any>>;
  className?: string;
  options?: {
    buttonContainerClass: string;
  };
};

export const LineItemRepeater = ({
  children,
  className,
  options,
}: ILineFormRepeater) => {
  const [fields, setFields] = useState([0]);

  const addField = () => {
    setFields([...fields, fields.length]);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((field) => field !== index);
    setFields(updatedFields);
  };

  return (
    <div className={className}>
      {fields.map((fieldIndex) => (
        <div className="flex items-center mb-4" key={fieldIndex}>
          <div style={{ flex: 1 }}>
            {React.cloneElement(children(fieldIndex), { index: fieldIndex })}
          </div>
          <div className={options?.buttonContainerClass}>
            <img
              src={IconDelete}
              className=" ml-4 cursor-pointer"
              onClick={() => removeField(fieldIndex)}
            />
          </div>
        </div>
      ))}
      <button
        onClick={(event) => {
          event.preventDefault();
          addField();
        }}
        className="border-meta-12 text-meta-12 inline-flex items-center justify-center rounded-full border-2 border-primary py-2 px-5 mt-4 text-center font-bold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        + Add
      </button>
    </div>
  );
};
