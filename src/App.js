import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScheduleForms from "./component/ScheduleForms";
import PaymentForm from "./component/PaymentForm";
import MentorProfile from "./component/MentorProfile";
import UpcomingSessions from "./component/UpcomingSessions";

const App = () => {
  const [sessionDetails, setSessionDetails] = useState(null);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<ScheduleForms setSessionDetails={setSessionDetails} />}
          />
          <Route
            path="/payment"
            element={<PaymentForm sessionDetails={sessionDetails} />}
          />
          <Route path="/mentor/:id" element={<MentorProfile />} />
          <Route path="/upcomingsessions" element={<UpcomingSessions />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
