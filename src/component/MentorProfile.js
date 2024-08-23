// src/component/MentorProfile.js
import React from "react";
import { useParams } from "react-router-dom";
import data from "./data.json";

const MentorProfile = () => {
  const { id } = useParams();
  const mentor = data.mentors.find((m) => m.id === parseInt(id));

  if (!mentor) {
    return <div>Mentor not found.</div>;
  }

  return (
    <div className="mentor-profile">
      <h2>{mentor.name}</h2>
      <p>
        <strong>Areas of Expertise:</strong>{" "}
        {mentor.areas_of_expertise.join(", ")}
      </p>
      <p>
        <strong>Available From:</strong> {mentor.available_from}
      </p>
      <p>
        <strong>Available To:</strong> {mentor.available_to}
      </p>
    </div>
  );
};

export default MentorProfile;
