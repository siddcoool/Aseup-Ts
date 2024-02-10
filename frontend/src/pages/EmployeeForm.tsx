import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import RadioGroup from "../common/component/RadioButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { LineItemRepeater } from "../common/component/LineItemRepeater";

const EmployeeForm = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [isEmployeeCreated, setIsEmployeeCreated] = useState(false);
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: 0,
      DOB: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      title: "",
      field: "",
      institue: "",
      startYear: "",
      endYear: "",

      
      Skills: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
        .required("This is a required field"),
      email: Yup.string()
        .email("Must be a valid Email")
        .required("This is a required field"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Must contain only numeric characters")
        .required("input must be a number"),
      gender: Yup.string().required("This is a required field"),
      DOB: Yup.date().required("This is a required field"),
      currentCTC: Yup.number().required("This is a required field"),
      expectedCTC: Yup.number().required("This is a required field"),
      noticePeriod: Yup.number().required("This is a required field"),
      Skills: Yup.string(),
    }),
    onSubmit: async (values) => {
      const { status, data } = await axios.post("/employee/", {
        ...values,
        gender: selectedGender,
      });

      if (status === 201) {
        toast.success(data.message);
        setIsEmployeeCreated(true);
      } else {
        toast.warn("Failed");
      }
    },
  });

  const handleRadioChange = (selectedValue: string) => {
    console.log("Selected Value:", selectedValue);
    setSelectedGender(selectedValue);
  };

  const radioOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  useEffect(() => {
    if (isEmployeeCreated) {
      navigate("/home");
    }
  }, [isEmployeeCreated]);

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Add Employee
        </div>
        {/* <form className="py-4 px-6" action="" method="POST"> */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            onChange={handleChange}
            value={values.name}
            placeholder="Enter your name"
          />
          {errors ? errors.name : ""}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            placeholder="Enter your email"
          />
          {errors ? errors.email : ""}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            onChange={handleChange}
            value={values.phone}
            placeholder="Enter your phone number"
          />
          {errors ? errors.phone : ""}
        </div>
        <div className="">
          <div className="font-bold">Gender</div>
          <div className="mb-4 mt-4  space-x-4">
            <RadioGroup options={radioOptions} onChange={handleRadioChange} />
          </div>
        </div>
        <div >
          <div className="font-bold text-black text-center text-xl">
          Enter Education Details
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              onChange={handleChange}
              value={values.title}
              placeholder="Enter your name"
            />
            {errors ? errors.name : ""}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              field
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="field"
              type="text"
              onChange={handleChange}
              value={values.field}
              placeholder="Enter your name"
            />
            {errors ? errors.name : ""}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              institue
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="institue"
              type="text"
              onChange={handleChange}
              value={values.institue}
              placeholder="Enter your name"
            />
            {errors ? errors.name : ""}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Start Year
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startYear"
              onChange={handleChange}
              value={values.startYear}
              type="date"
              placeholder="Select a date"
            />
            {errors ? errors.DOB : ""}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              End Year
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endYear"
              onChange={handleChange}
              value={values.endYear}
              type="date"
              placeholder="Select a date"
            />
            {errors ? errors.DOB : ""}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Current CTC
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="currentCTC"
            onChange={handleChange}
            value={values.currentCTC}
            placeholder="Enter your Current CTC"
          />
          {errors ? errors.currentCTC : ""}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Expected CTC
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="expectedCTC"
            onChange={handleChange}
            value={values.expectedCTC}
            placeholder="Enter your Expected CTC "
          />
          {errors ? errors.expectedCTC : ""}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Notice Period
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="noticePeriod"
            onChange={handleChange}
            value={values.noticePeriod}
            placeholder="Enter your Notice Period in days "
          />
          {errors ? errors.currentCTC : ""}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Skills
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Skills"
            type="tel"
            onChange={handleChange}
            value={values.Skills}
            placeholder="Enter your Skills "
          />
          {errors ? errors.Skills : ""}
        </div>

        <div className="flex items-center justify-center mb-4">
          <button
            className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e: any) => handleSubmit(e)}
          >
            Add Employee
          </button>
        </div>
        <div>
          {/* <LineItemRepeater>
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  onChange={handleChange}
                  value={values.name}
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </LineItemRepeater> */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
