import React from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";
import Masonry from 'react-masonry-css';
import "../App.css";

const Home = () => {
  const { pins, loading } = PinData();

  // Define breakpoint columns for the masonry layout
  const breakpointColumnsObj = {
    default: 4,  // 4 columns by default
    1100: 3,     // 3 columns at 1100px
    700: 2,      // 2 columns at 700px
    500: 1,      // 1 column at 500px
  };

  return (
    <div className="p-4">
      {loading ? (
        <Loading />
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid" // default Masonry CSS
          columnClassName="my-masonry-grid_column"
        >
          {pins.map((pin) => (
            <div key={pin._id}>
              <PinCard pin={pin} />
            </div>
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default Home;
