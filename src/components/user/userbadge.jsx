import React, { useState } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { CircleUser, Settings, ArrowRight } from 'lucide-react';

export const UserBadge = ({ profilePicture, fullName, onLogout }) => {
  const [imgError, setImgError] = useState(false);

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Custom toggle component to avoid default button styling
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex align-items-center gap-2 py-1 px-2 rounded-3 user-badge-toggle"
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  ));

  const handleLogout = () => {
    if (window.confirm("Do you want to Logout?")) {
      onLogout?.();
    }
  };

  return (
    <>
      <style type="text/css">
        {`
          .user-badge-toggle {
            transition: background-color 0.2s ease;
          }
          
          .user-badge-toggle:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }

          .dark .user-badge-toggle:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }

          .profile-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            font-size: 14px;
            border: 2px solid #fff;
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
          }

          .dropdown-menu {
            min-width: 200px;
            padding: 0.5rem 0;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .dropdown-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            color: #333;
            transition: background-color 0.2s ease;
          }

          .dropdown-item:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }

          .dropdown-item.danger {
            color: #dc3545;
          }

          .dropdown-item.danger:hover {
            background-color: rgba(220, 53, 69, 0.1);
          }

          .dropdown-divider {
            margin: 0.5rem 0;
          }

          @media (prefers-color-scheme: dark) {
            .dropdown-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            color: #f2f2f2;
            transition: background-color 0.2s ease;
          }
          }
        `}
      </style>

      <Dropdown align="end">
        <Dropdown.Toggle as={CustomToggle}>
          {profilePicture && !imgError ? (
            <Image
              src={profilePicture}
              alt={fullName}
              className="profile-avatar"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="profile-avatar bg-primary text-white">
              {getInitials(fullName)}
            </div>
          )}
          <span className="d-none d-sm-inline fw-medium text-white">{fullName}</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="ms-1"
          >
            <path 
              d="M4 6L8 10L12 6" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/profile" className="py-2">
            <CircleUser size={16} />
            <span>Profile</span>
          </Dropdown.Item>
          
          <Dropdown.Item href="/settings" className="py-2">
            <Settings size={16} />
            <span>Settings</span>
          </Dropdown.Item>
          
          <Dropdown.Divider />
          
          <Dropdown.Item 
            onClick={handleLogout} 
            className="danger py-2"
          >
            <ArrowRight size={16} />
            <span>Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

// export default UserBadge;