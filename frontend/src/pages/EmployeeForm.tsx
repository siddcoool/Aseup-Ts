import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import RadioGroup from "../common/component/RadioButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [isEmployeeCreated, setIsEmployeeCreated] = useState(false);
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: 0,
      DOB: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      Skills: [],
    },
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
        <form className="py-4 px-6" action="" method="POST">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
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
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
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
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
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
          </div>
          <div className="">
            <div className="font-bold">Gender</div>
            <div className="mb-4 mt-4  space-x-4">
              <RadioGroup options={radioOptions} onChange={handleRadioChange} />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Date of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="DOB"
              onChange={handleChange}
              value={values.DOB}
              type="date"
              placeholder="Select a date"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Current CTC
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="currentCTC"
              onChange={handleChange}
              value={values.currentCTC}
              placeholder="Enter your Current CTC"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Expected CTC
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expectedCTC"
              onChange={handleChange}
              value={values.expectedCTC}
              placeholder="Enter your Expected CTC "
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Notice Period
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="noticePeriod"
              onChange={handleChange}
              value={values.noticePeriod}
              placeholder="Enter your Notice Period in days "
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
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
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e:any) => handleSubmit(e)}
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
