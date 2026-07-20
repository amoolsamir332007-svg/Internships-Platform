import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import InternshipCard from '../../common/InternshipCards/InternshipCard';
import * as internshipService from '../../../api/internshipService';
import { ROUTES } from '../../../utils/constants';
import './ApplicationsSection.css';

const ApplicationsSection = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchInitialInternships = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await internshipService.getPublished();
      setInternships(response.data || []);
    } catch (err) {
      setError('Something went wrong while fetching internships. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialInternships();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchInitialInternships();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await internshipService.searchPublished(query);
      setInternships(response.data || []);
    } catch (err) {
      setError('Something went wrong while searching for internships. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
console.log(
  internships.map(i => ({
    id: i.opportunityID,
    title: i.title
  }))
);
  return (
    <section id="applications" className="applications-section">
      <div className="section-header">
        <h2>Available Internships</h2>
        <p> Explore the available internship opportunities and kickstart your career </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="section-message">Loading available opportunities...</div>
      ) : error ? (
        <div className="section-message error">{error}</div>
      ) : internships.length === 0 ? (
        <div className="section-message">No matching internships found at the moment.</div>
      ) : (
        <div className="internships-grid">
          {internships.map((internship) => (
            <InternshipCard
              key={internship.opportunityID}
              internship={internship}
              onClick={() => navigate(ROUTES.INTERNSHIP_DETAIL(internship.opportunityID))}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ApplicationsSection;
