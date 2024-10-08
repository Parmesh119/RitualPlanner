import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true); // Show popup if no consent is found
    }
  }, []);

  const handleAcceptCookies = () => {
    // Set the cookie consent in localStorage
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false); // Hide the consent popup
  };

  if (!showConsent) {
    return null; // Do not render the popup if consent is already given
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50"> {/* Added z-50 */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left"> {/* Center text on small screens */}
          This website uses cookies to ensure you get the best experience on our website.{' '}
          <a href="/privacy-policy" className="underline">Learn more</a>
        </p>
        <button
          onClick={handleAcceptCookies}
          className="bg-blue-500 px-4 py-2 rounded-md mt-2 md:mt-0 hover:bg-blue-400"
        >
          Accept
        </button>
      </div>
    </div>

  );
};

export default CookieConsent;
