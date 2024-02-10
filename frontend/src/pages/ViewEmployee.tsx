import React from "react";

export default function ViewEmployee() {
  return (
    <div>
      <h1 className="text-center text-3xl mt-3 font-medium text-violet-600">
        Employee Details
      </h1>
      <table className="m-3 border-2 border-violet-900">
        <thead className="">
          <tr className="border-2 border-violet-900">
            <th className="px-6 border-2 border-violet-900 ">Name</th>
            <th className="px-6 border-2 border-violet-900">Email</th>
            <th className="px-6 border-2 border-violet-900">Contact NO</th>
            <th className="px-6 border-2 border-violet-900">DOB</th>
            <th className="px-6 border-2 border-violet-900">Gender</th>
            <th className="px-6 border-2 border-violet-900">Current CTC</th>
            <th className="px-6 border-2 border-violet-900">Expected CTC</th>
            <th className="px-6 border-2 border-violet-900">Notice Period(days)</th>
            <th className="px-6 border-2 border-violet-900">Skills</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="px-6 border-2 border-violet-900 font-normal">Ashutosh</th>
            <th className="px-6 border-2 border-violet-900 font-normal">Ashu.v.jain@gmail.com</th>
            <th className="px-6 border-2 border-violet-900 font-normal">9085467543</th>
            <th className="px-6 border-2 border-violet-900 font-normal">31/04/1999</th>
            <th className="px-6 border-2 border-violet-900 font-normal">Male</th>
            <th className="px-6 border-2 border-violet-900 font-normal">120000</th>
            <th className="px-6 border-2 border-violet-900 font-normal">600000</th>
            <th className="px-6 border-2 border-violet-900 font-normal">30</th>
            <th className="px-6 border-2 border-violet-900 font-normal">HTML</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
