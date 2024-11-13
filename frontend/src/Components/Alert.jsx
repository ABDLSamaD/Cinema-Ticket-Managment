import React, { useState, useEffect } from "react";
import "./Styles.css";

const Alert = ({ show, message }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [show]);

  return (
    isVisible && (
      <div className="alertcomponent">
        <p>{message}</p>
      </div>
    )
  );
};

export default Alert;
