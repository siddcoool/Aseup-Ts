import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { JSXElementConstructor, ReactElement, useEffect, useState } from "react";

type ILineFormRepeater = {
  children: (
    index: number,
  ) => ReactElement<any, string | JSXElementConstructor<any>>;
  className?: string;
  addButtonLabel?: string;
  deleteButtonLabel?: string;
  hidden?: boolean
  size?: number
};

const getArray = (size?: number) => {
  return size ? Array.from({ length: size }, (_, i) => i) : [0];
};

export const LineItemRepeater = ({
  children,
  className,
  addButtonLabel,
  deleteButtonLabel,
  hidden,
  size
}: ILineFormRepeater) => {
  const [fields, setFields] = useState([0]);

  const addField = () => {
    setFields([...fields, fields.length]);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((field) => field !== index);
    setFields(updatedFields);
  };

  useEffect(() => {
    if (Number.isInteger(size)) {
      setFields([...getArray(size)]);
    }
  }, [size]);

  return (
    <div className={className} style={{
      display: hidden? `none`: `block`
    }}>
      {fields.map((fieldIndex) => (
        <div
          className="mb-4 flex w-full flex-col items-center rounded shadow-xl py-6 px-2"
          key={fieldIndex}
        >
          <div className="mb-2 w-full" style={{ flex: 1 }}>
            {React.cloneElement(children(fieldIndex), { index: fieldIndex })}
          </div>

          <div className="flex w-full justify-end ">
            <Button
              variant="outline"
              colorScheme="red"
              rightIcon={<DeleteIcon />}
              onClick={() => removeField(fieldIndex)}
            >
              {deleteButtonLabel ? deleteButtonLabel : "Delete"}
            </Button>
          </div>
        </div>
      ))}
      <div className="flex gap-x-4">
        <Button
          rightIcon={<AddIcon />}
          colorScheme="blue"
          onClick={() => addField()}
        >
          {addButtonLabel ? addButtonLabel : "Add"}
        </Button>
      </div>
    </div>
  );
};
