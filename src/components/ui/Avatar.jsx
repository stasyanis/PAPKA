// src/components/ui/Avatar.jsx
const Avatar = ({ user, onClick }) => {
    return (
      <div className="header-icon" onClick={onClick}>
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="avatar-image"
          />
        ) : (
          <i className="fas fa-user"></i>
        )}
      </div>
    );
  };
  
  export default Avatar;