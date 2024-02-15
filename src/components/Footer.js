import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="social-media">
        <a href="https://twitter.com/shikwe_gilbert" target="_blank" rel="noopener noreferrer">
          <img src="fb.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com/shikwe_gilbert" target="_blank" rel="noopener noreferrer">
          <img src="X.png" alt="Twitter" />
        </a>
        <a href="https://example.com/instagram" target="_blank" rel="noopener noreferrer">
          <img src="inst.jpeg" alt="Instagram" />
        </a>
      </div>
      <p>&copy; 2024 Soma Code App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;