import { useFormik } from "formik";

const EmployeeForm = () => {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      DOB: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      Skills: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
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
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="service"
            >
              Gender
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="service"
              onChange={handleChange}
              value={values.gender}
              name="service"
            >
              <option value="">Select gender</option>
              <option value="haircut">Male</option>
              <option value="coloring">Female</option>
            </select>
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
              id="date"
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
              id="currentCtc"
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
              id="expectedCtc"
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
              id="phone"
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
              id="phone"
              type="tel"
              onChange={handleChange}
              value={values.noticePeriod}
              placeholder="Enter your Skills "
            />
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
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
