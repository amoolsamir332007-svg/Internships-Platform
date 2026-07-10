const LoadingSpinner = ({ size = "medium", fullScreen = false }) => {
  const sizeClasses = {
    small: "spinner-small",
    medium: "spinner-medium",
    large: "spinner-large",
  };
 
  return (
    <div className={fullScreen ? "spinner-fullscreen" : "spinner-container"}>
      <div className={`spinner ${sizeClasses[size]}`}></div>
    </div>
  );
};
 
export default LoadingSpinner;
 