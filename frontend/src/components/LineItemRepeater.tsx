"use client";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { JSXElementConstructor, ReactElement, useState } from "react";

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
        <div
          className="mb-4 flex w-full flex-col items-center"
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
              Delete
            </Button>
          </div>
        </div>
      ))}
      <div className="flex gap-x-4">
        <Button
          rightIcon={<AddIcon />}
          colorScheme="blue"
          onClick={(e:any) => {
            e.preventDefault();
            addField();
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
