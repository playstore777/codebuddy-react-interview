import { useState } from "react";
import "./StepperForm.css";
import CredsForm from "./forms/CredSForm";
import UserDetailsForm from "./forms/UserDetailsForm";
import ContactForm from "./forms/ContactForm";
import { useNavigate } from "react-router-dom";
import { submitForm } from "../services/services";

const StepperForm = () => {
  const [activeStepIndex, setActiveStep] = useState(0);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "+91",
    phoneNumber: "",
  });
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  const steps = [
    {
      id: 0,
      value: "credentials",
      label: "Credentials",
      disabled: false,
    },
    {
      id: 1,
      value: "userDetails",
      label: "User Details",
      disabled: true,
    },
    {
      id: 2,
      value: "contactDetails",
      label: "Contact Details",
      disabled: true,
    },
  ];

  const changeStepHandler = (index, step) => {
    if (error) {
      console.log("Error, can't proceed!");
      return;
    }
    !step.disabled && setActiveStep(index);
  };

  const updateStepHandler = (action) => {
    if (error) {
      console.log("Error, can't proceed!");
      return;
    }
    let stepIndex = 0;
    if (action === "next") {
      stepIndex = activeStepIndex + 1;
    }
    if (action === "prev") {
      stepIndex = activeStepIndex - 1;
    }
    const step = steps[stepIndex];
    step.disabled = false;
    setActiveStep(stepIndex);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      if (activeStepIndex < steps.length - 1) {
        updateStepHandler("next");
      } else {
        saveData();
      }
    }
  };

  const currentForm = () => {
    switch (activeStepIndex) {
      case 0:
        return <CredsForm formData={formData} setFormData={setFormData} setError={setError} />;
      case 1:
        return (
          <UserDetailsForm formData={formData} setFormData={setFormData} setError={setError} />
        );
      case 2:
        return (
          <ContactForm
            formData={formData}
            setFormData={setFormData}
            setError={setError}
            termsAndConditions={termsAndConditions}
            setTermsAndConditions={setTermsAndConditions}
          />
        );
      default:
        return <CredsForm formData={formData} setFormData={setFormData} setError={setError} />;
    }
  };

  const saveData = async () => {
    await submitForm(formData);
    navigate("/posts");
  };

  return (
    <div className="stepper-form-wrapper">
      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            key={step.id + "" + index}
            className={`steps ${activeStepIndex === index ? "active-step" : ""}`}
            onClick={() => changeStepHandler(index, step)}
            disabled={step.disabled}
          >
            {step.label}
          </div>
        ))}
      </div>
      <div className="stepper-form-container">
        <form onSubmit={handleSubmit}>
          <div className="main">{currentForm()}</div>
          <div className="flex justify-around py-2">
            <button
              type="submit"
              onClick={() => updateStepHandler("prev")}
              disabled={activeStepIndex <= 0}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              Back
            </button>
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-blue-400">
              Save
            </button>
            <button
              type="submit"
              disabled={activeStepIndex >= steps.length - 1}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              Save and Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepperForm;
