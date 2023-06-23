import React, { useState } from 'react';
import axios from 'axios';
import './css/University.css';

const University = () => {
  const [gmat, setGmat] = useState('');
  const [gre, setGre] = useState('');
  const [gpa, setGpa] = useState('');
  const [tuition, setTuition] = useState('');
  const [countryName, setCountryName] = useState('');
  const [uniType, setUniType] = useState('');
  const [universities, setUniversities] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/bx_block_university/ideal_universities',
        {
          gmat,
          gre,
          gpa,
          tuition,
          country_name: countryName,
          uni_type: uniType,
        }
      );

      const { universities } = response.data;
      setUniversities(universities);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  return (
    <div className="university-container">
      <h2>Ideal Universities</h2>
      <form className="university-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="gmat">GMAT:</label>
          <input
            type="number"
            id="gmat"
            value={gmat}
            onChange={(e) => setGmat(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gre">GRE:</label>
          <input
            type="number"
            id="gre"
            value={gre}
            onChange={(e) => setGre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gpa">GPA:</label>
          <input
            type="number"
            id="gpa"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tuition">Tuition:</label>
          <input
            type="number"
            id="tuition"
            value={tuition}
            onChange={(e) => setTuition(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="countryName">Country Name:</label>
          <input
            type="text"
            id="countryName"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="uniType">University Type:</label>
          <input
            type="text"
            id="uniType"
            value={uniType}
            onChange={(e) => setUniType(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div className="university-card-container">
        {universities.map((university) => (
          <div className="university-card" key={university.id}>
            <div className="university-card-details">
              <h3>{university.name}</h3>
              <p>Rank: {university.rank}</p>
              <p>Tuition: {university.tuition}</p>
              <p>GPA: {university.gpa}</p>
              <p>Country: {university.country_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default University;
