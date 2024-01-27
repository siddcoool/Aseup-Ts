import React, { useState } from "react";
import Sidebar from "./Sidebar";

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
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar/>
      Dashboard
    </div>
  );
}
