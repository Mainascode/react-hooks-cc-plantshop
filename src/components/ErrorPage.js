import React from 'react';
//  CSS for styling the error page
import './ErrorPage.css'; 

const ErrorPage = ({ message, onRetry }) => {
  return (
    <div className="error-page">
      <h2>Error: {message}</h2>
      {onRetry && (
        <button onClick={onRetry}>Retry</button>
      )}
    </div>
  );
};

export default ErrorPage;