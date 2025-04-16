import React from 'react';
import { Link } from 'react-router-dom';

const Default = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">You need to login to like games</h1>
      <Link to="/" className="btn btn-primary mt-3">
        Go back Home
      </Link>
    </div>
  );
};

export default Default;
