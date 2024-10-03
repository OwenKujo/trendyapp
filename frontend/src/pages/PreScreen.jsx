import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext"; // Assuming you're using UserContext for state management

const interestsList = [
  "Fashion",
  "Technology",
  "Travel",
  "Food",
  "Art",
  "Fitness",
  "Music",
  "Photography",
  "Home Decor",
  "DIY",
];

const PreScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();
  const { updateUserInterests } = UserData(); // Function to update user interests in context

  const handleInterestChange = (interest) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleSubmit = () => {
    // Store the selected interests
    updateUserInterests(selectedInterests); // Assuming this updates the context or user profile
    console.log("Selected Interests:", selectedInterests);
    
    // Navigate to the Home page after submitting interests
    navigate("/"); // Redirect to Home page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Choose Your Interests
        </h2>
        <div className="space-y-4">
          {interestsList.map((interest) => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedInterests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
              />
              {interest}
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white p-2 rounded-full w-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PreScreen;
