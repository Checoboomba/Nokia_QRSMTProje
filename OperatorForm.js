import React, { useState } from "react";
import axios from "axios";
import "./OperatorForm.css"; // Ensure this file is in the same directory

const OperatorForm = () => {
  const [formData, setFormData] = useState({
    operatorId: "",
    operatorName: "",
    lineNumber: "",
    machineNumber: "",
    errors: [],
    satisfaction: "",
  });

  const errorOptions = [
    "Misaligned or misplaced components",
    "Equipment issues or breakdowns",
    "Component handling and storage",
    "Solder paste and stencil maintenance",
    "Component inspection and sorting",
    "Visual inspection and quality control",
    "Inventory Management Issues",
    "Reflow Oven Problems",
    "Cleaning and Maintenance",
  ];

  const satisfactionOptions = [
    "Very satisfied",
    "Satisfied",
    "Neutral",
    "Dissatisfied",
    "Very dissatisfied",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for Operator ID (Alphanumeric only)
    if (name === "operatorId" && !/^[a-zA-Z0-9]*$/.test(value)) {
      return;
    }

    // Validation for Operator Name (Only Alphabets)
    if (name === "operatorName" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }

    // Validation for Line Number and Machine Number (Only Numbers)
    if ((name === "lineNumber" || name === "machineNumber") && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      errors: checked
        ? [...prevData.errors, value]
        : prevData.errors.filter((error) => error !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/report", formData);
      alert(`Ticket Created! Ticket ID: ${response.data.ticketId}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit ticket. Please try again.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Q1) SMT Operator ID:</label>
      <input
        type="text"
        name="operatorId"
        placeholder="Enter Operator ID (Alphanumeric)"
        value={formData.operatorId}
        onChange={handleChange}
        required
      />

      <label>Q2) SMT Operator Name:</label>
      <input
        type="text"
        name="operatorName"
        placeholder="Enter Operator Name (Only Alphabets)"
        value={formData.operatorName}
        onChange={handleChange}
        required
      />

      <label>Q3) SMT Line Number:</label>
      <input
        type="number"
        name="lineNumber"
        placeholder="Enter Line Number"
        value={formData.lineNumber}
        onChange={handleChange}
        required
      />

      <label>Q4) SMT Process Machine Number:</label>
      <input
        type="number"
        name="machineNumber"
        placeholder="Enter Machine Number"
        value={formData.machineNumber}
        onChange={handleChange}
        required
      />

      <label>Q5) Fault or Errors:</label>
      <div className="checkbox-group">
        {errorOptions.map((error, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={error}
              checked={formData.errors.includes(error)}
              onChange={handleCheckboxChange}
            />
            {error}
          </label>
        ))}
      </div>

      <label>Q6) Overall Production Satisfaction:</label>
      <div className="radio-group">
        {satisfactionOptions.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="satisfaction"
              value={option}
              checked={formData.satisfaction === option}
              onChange={handleChange}
              required
            />
            {option}
          </label>
        ))}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default OperatorForm;
