import React from 'react';

const NotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <img
          src="https://via.placeholder.com/400x300?text=404+Not+Found"
          alt="Page Not Found"
          className="img-fluid mb-4"
        />
        <h1 className="display-4">Oops! Page Not Found</h1>
        <p className="lead">Sorry, the page you're looking for does not exist. Please check the URL or go back to the homepage.</p>
        <a href="/" className="btn btn-primary">Go to Homepage</a>
      </div>
    </div>
  );
};

export default NotFound;
