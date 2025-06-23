import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array includes pathname to re-run effect on route change

  return null; // This component doesn't render anything
}

export default ScrollToTop; 