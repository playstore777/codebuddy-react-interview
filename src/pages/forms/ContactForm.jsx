import PropTypes from "prop-types";

import { useState } from "react";

import Input from "../Input";

const initialErrorData = {
  phoneNumber: "",
  termsAndConditions: "",
};

const ContactForm = ({
  formData,
  setFormData,
  setError,
  termsAndConditions,
  setTermsAndConditions,
}) => {
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
      case "phoneNumber":
        if (!/[0-9]{10}/.test(value)) {
          updatedErrors.phoneNumber = "Phone number must be numbers and in this format: ##########";
          setError(true);
        } else {
          delete updatedErrors.phoneNumber;
        }
        break;
      case "termsAndCondition":
        if (!termsAndConditions) {
          updatedErrors.termsAndConditions = "It is mandatory to accept Terms And Condition";
          setError(true);
        } else {
          delete updatedErrors.termsAndConditions;
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
        id="country-code"
        name="countryCode"
        type="select"
        label="Country Code"
        value={formData.countryCode}
        onChange={handleChange}
        onBlur={onBlur}
        options={["+91", "+1"]}
        required
        error={errors.countryCode}
      />
      <Input
        id="phone-number"
        name="phoneNumber"
        type="tel"
        label="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        onBlur={onBlur}
        required
        error={errors.phoneNumber}
      />
      <Input
        id="checkbox"
        name="termsAndCondition"
        type="checkbox"
        label="Terms And Condition"
        value={termsAndConditions}
        onChange={() => {
          setTermsAndConditions((prev) => !prev);
        }}
        onBlur={onBlur}
        layout={"flex"}
        required
        error={errors.termsAndConditions}
      />
    </>
  );
};

ContactForm.propTypes = {
  setError: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  termsAndConditions: PropTypes.bool.isRequired,
  setTermsAndConditions: PropTypes.func.isRequired,
};

export default ContactForm;
