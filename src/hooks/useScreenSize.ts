import { useState, useEffect } from "react";

function useScreenSize(screenSize: number) {
  const [isScreenSizeRange, setIsScreenSizeRange] = useState(false);

  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      // You can set your own width breakpoint here
      setIsScreenSizeRange(window.innerWidth >= screenSize); // Assuming 1024px is the desktop breakpoint
    };

    // Initial check on component mount
    checkScreenSize();

    // Add event listener to handle window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [screenSize]);

  return isScreenSizeRange;
}

export default useScreenSize;
