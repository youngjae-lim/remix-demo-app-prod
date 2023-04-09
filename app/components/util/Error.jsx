import { FaExclamationCircle } from 'react-icons/fa';

// Error component is used to display error messages
function Error({ title, children }) {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;
