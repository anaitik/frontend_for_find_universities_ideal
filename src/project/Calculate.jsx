import React, { useState } from 'react';
import axios from 'axios';
import './css/Calculate.css';

const Calculate = () => {
  const [cgpa, setCGPA] = useState('');
  const [topperGPA, setTopperGPA] = useState('');
  const [calculatedGPA, setCalculatedGPA] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/bx_block_calculate_gpa/calculate_gpa',
        {
          cgpa,
          topper_gpa: topperGPA,
        }
      );

      // Assuming the API returns the GPA value in the response
      const { gpa } = response.data;
      setCalculatedGPA(gpa.toString()); // Convert the GPA value to a string before setting it in state
    } catch (error) {
      console.error('Error calculating GPA:', error);
    }
  };

  return (
    <div className="calculate-container">
      <h2>GPA Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cgpa">CGPA:</label>
          <input
            type="number"
            id="cgpa"
            value={cgpa}
            onChange={(e) => setCGPA(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="topper-gpa">Topper GPA:</label>
          <input
            type="number"
            id="topper-gpa"
            value={topperGPA}
            onChange={(e) => setTopperGPA(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate GPA</button>
      </form>
      {calculatedGPA && (
        <p className="calculated-gpa">
          Calculated GPA: <span>{calculatedGPA}</span>
        </p>
      )}
    </div>
  );
};

export default Calculate;
