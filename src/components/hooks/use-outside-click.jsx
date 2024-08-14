import { useEffect } from 'react';

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      // Check if the click was outside the referenced element
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    // Add event listeners for click and touch events
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};
