import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = { hasError: false };

  // we call static methods directly on the class
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // typically you would log this to something like TrackJS or NewRelic...
    console.error("ErrorBoundary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      // instead of providing simple mesage we can provide error component
      return (
        <h2>
          There was an error with this listing.{" "}
          <Link to="/">Click here to go back to the home page.</Link>
        </h2>
        //return (this.props.errorComponent)
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
