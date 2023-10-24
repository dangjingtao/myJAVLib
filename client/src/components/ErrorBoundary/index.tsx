import React, { ErrorInfo } from "react";
import LoadFailed from "@/components/EmptyContent/LoadFailed";

interface ErrorBoundaryProps {
  fallback: React.ReactElement;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: "", errorInfo: "" };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 这里可以添加一些错误日志记录的逻辑
    // console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error.message,
      errorInfo: JSON.stringify(errorInfo),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <LoadFailed
          title={this.state.error}
          description={this.state.errorInfo}
        />
      );
    }
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
