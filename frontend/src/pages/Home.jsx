import React from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";

const Home = () => {
  const { pins, loading } = PinData();

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle pins if they exist
  const shuffledPins = pins ? shuffleArray([...pins]) : [];

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Updated gap for less spacing */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {shuffledPins.length > 0 ? (
                shuffledPins.map((e) => (
                  <div className="flex justify-center" key={e._id}>
                    <PinCard pin={e} />
                  </div>
                ))
              ) : (
                <p>No Posts Yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
