import PropTypes from "prop-types";
import { useState } from "react";

const initialErrorData = {
  email: "",
  password: "",
};

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex =
  /^(?=(?:.*\d){2})(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*[!@#$%^&*()\-+=.]){2}).{8,}$/;

const CredsForm = ({ formData, setFormData, setError }) => {
  const [errors, setErrors] = useState(initialErrorData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onBlur = (e) => {
    const newErrors = {};
    if (e.target.name === "email") {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email is invalid";
        setError(true);
      }
    }
    if (e.target.name === "password") {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Password must contain at least 2 capital letters, 2 small letters, 2 numbers and 2 special characters";
        setError(true);
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Form is valid
      setError(false);
      setErrors(initialErrorData);
      console.log("Form submitted:", formData);
    }
  };

  return (
    <>
      <div className="py-2">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={onBlur}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="py-2">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            onBlur={onBlur}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
    </>
  );
};

CredsForm.propTypes = {
  setError: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default CredsForm;
