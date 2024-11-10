import React from "react";

function ErrorPage({ message }) {
  return (
    <div className="error-page">
      <h2>Oops! Error Retry.</h2>
      <p>{message || "An unexpected error occurred."}</p>
    </div>
  );
}

export default ErrorPage;