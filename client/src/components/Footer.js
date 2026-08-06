import './Footer.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'https://library-management-system-app-production-cc36.up.railway.app/api';

function Footer() {
  return (
    <footer className="footer">
      <p>
        Library Management App • Backend API: <code>{API_BASE}</code>
      </p>
    </footer>
  );
}

export default Footer;
