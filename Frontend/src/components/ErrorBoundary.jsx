// import React from "react";

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught by ErrorBoundary:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h2>Something went wrong with the Profile 😔</h2>;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;



import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
          <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Something went wrong 😔
            </h2>
            <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
              We're sorry, but there was an issue loading the page.
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
