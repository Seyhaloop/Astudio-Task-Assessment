import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="card border-danger">
            <div className="card-header bg-danger text-white">
              <h4 className="mb-0">⚠️ Something went wrong</h4>
            </div>
            <div className="card-body">
              <p className="mb-3">
                The application encountered an unexpected error. Please try
                refreshing the page.
              </p>

              {this.state.error && (
                <div className="alert alert-light border">
                  <strong>Error:</strong> {this.state.error.toString()}
                </div>
              )}

              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>

              {process.env.NODE_ENV === "development" &&
                this.state.errorInfo && (
                  <details className="mt-3">
                    <summary className="btn btn-sm btn-outline-secondary">
                      Show Error Details
                    </summary>
                    <pre
                      className="mt-2 p-3 bg-light border rounded"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
