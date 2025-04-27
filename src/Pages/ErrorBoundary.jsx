import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("Caught error in ErrorBoundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error Details:", error);
    console.error("Component Stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container text-center p-3">
          <h2>⚠ Oops! Something went wrong.</h2>
          <p>We're working on fixing this issue. Please try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
