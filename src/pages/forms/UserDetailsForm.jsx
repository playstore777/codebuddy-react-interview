import PropTypes from "prop-types";
import { useState } from "react";
import Input from "../Input";

const initialErrorData = {
  firstName: "",
  lastName: "",
  address: "",
};

const UserDetailsForm = ({ formData, setFormData, setError }) => {
  const [errors, setErrors] = useState(initialErrorData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    const updatedErrors = { ...errors };
    switch (name) {
      case "firstName":
        if (!value) {
          updatedErrors.firstName = "First Name is required";
        } else if (value.length < 2 || value.length > 50) {
          updatedErrors.firstName = "First Name length should be between 2 to 50";
          setError(true);
        } else {
          delete updatedErrors.firstName;
        }
        break;
      case "lastName":
        if (value) {
          if (!/^[a-zA-Z]+$/.test(value)) {
            updatedErrors.lastName = "Only Alphabets allowed";
            setError(true);
          }
        } else {
          delete updatedErrors.lastName;
        }
        break;
      case "address":
        if (value.length < 10) {
          updatedErrors.address = "Minimun 10 characters required";
          setError(true);
        } else {
          delete updatedErrors.address;
        }
        break;

      default:
        break;
    }
    setErrors(updatedErrors);

    if (Object.keys(updatedErrors).length === 0) {
      setError(false); // Reset overall form error
    }
  };

  return (
    <>
      <Input
        id="first-name"
        name="firstName"
        type="text"
        label="First Name"
        value={formData.firstName}
        onChange={handleChange}
        onBlur={onBlur}
        required
        error={errors.firstName}
      />
      <Input
        id="last-name"
        name="lastName"
        type="text"
        label="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        onBlur={onBlur}
        error={errors.lastName}
      />
      <Input
        id="address"
        name="address"
        type="text"
        label="Address"
        value={formData.address}
        onChange={handleChange}
        onBlur={onBlur}
        required
        error={errors.address}
      />
    </>
  );
};

UserDetailsForm.propTypes = {
  setError: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default UserDetailsForm;
