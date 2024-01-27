import { FC, useState } from "react";
import React from "react";

export const Dashboard: FC = ()=> {
    const [content, setContent] = useState({
        name: "",
        contact: "",
      });
      const handleOnChange = (e :React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContent((PrevState) => {
          return {
            ...PrevState,
            [name]: value,
          };
        });
      };
      const handleOnSubmit=(e:any)=>{
        e.preventDefault();
    }
  return (
    <>
      <h1 className="font-sans text-4xl font-normal text-center mt-5">
        Crud Operation
      </h1>
      <div className="flex flex-col m-8" onSubmit={handleOnSubmit} >
        <div className="text-center py-6 flex justify-center">
          <label className="text-xl mr-5 ">Name</label>
          <input
            typeof="text"
            className="py-1 px-1 border-black border-solid"
            placeholder="Enter Name"
            value={content.name}
            onChange={(e)=>{}}
          />
        </div>
        <div className="text-center py-6 flex justify-center">
          <label className="text-xl mr-5">Contact No</label>
          <input
            typeof="text"
            className="py-1 px-1 border-black border-solid"
            placeholder="Enter Contact No "
            value={content.contact}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <button className="bg-orange-600 rounded-md py-1 px-3 mx-auto flex justify-center">
            Add Details
          </button>
        </div>
      </div>
    </>
  );
}
