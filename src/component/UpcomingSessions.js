// src/component/ScheduleForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import data from "./data.json";

const ScheduleForms = ({ setSessionDetails }) => {
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [mentor, setMentor] = useState("");
  const [duration, setDuration] = useState(30);
  const [availableMentors, setAvailableMentors] = useState([]);
  const [areasOfInterest, setAreasOfInterest] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAreasOfInterest(data.areas_of_interest);
  }, []);

  useEffect(() => {
    if (areaOfInterest) {
      const mentors = data.mentors.filter((m) =>
        m.areas_of_expertise.includes(areaOfInterest)
      );
      setAvailableMentors(mentors);
    } else {
      setAvailableMentors([]);
    }
  }, [areaOfInterest]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedMentor = mentor ? parseInt(mentor) : availableMentors[0]?.id;
    const sessionDetails = {
      date: selectedDate,
      duration,
      mentorSelected: selectedMentor !== undefined,
    };

    setSessionDetails(sessionDetails);
    navigate("/payment", { state: sessionDetails });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Area of Interest:</label>
        <select
          value={areaOfInterest}
          onChange={(e) => setAreaOfInterest(e.target.value)}
          required
        >
          <option value="">Select Area of Interest</option>
          {areasOfInterest.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Preferred Mentor:</label>
        <select value={mentor} onChange={(e) => setMentor(e.target.value)}>
          <option value="">Select Mentor</option>
          {availableMentors.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => navigate(`/mentor/${mentor}`)}
          disabled={!mentor}
        >
          View Mentor Profile
        </button>
      </div>

      <div>
        <label>Session Duration:</label>
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
        </select>
      </div>

      <div>
        <label>Select Date:</label>
        <Calendar onDateSelect={setSelectedDate} />
        {selectedDate && <p>Selected Date: {selectedDate}</p>}
      </div>

      <button type="submit">Schedule Session</button>
    </form>
  );
};

export default ScheduleForms;
