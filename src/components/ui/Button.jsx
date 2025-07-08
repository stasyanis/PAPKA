// src/components/ui/Button.jsx
import classNames from 'classnames';

const Button = ({ 
  children, 
  primary,
  secondary,
  success,
  danger,
  icon, 
  onClick, 
  className, 
  badge,
  fullWidth,
  disabled,
  ...props 
}) => {
  const classes = classNames(
    'btn',
    {
      'btn-primary': primary,
      'btn-secondary': secondary,
      'btn-success': success,
      'btn-danger': danger,
      'btn-icon': icon && !children,
      'btn-full-width': fullWidth,
      'btn-disabled': disabled
    },
    className
  );

  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {icon && <i className={`fas fa-${icon}`}></i>}
      {children && <span>{children}</span>}
      {badge && badge > 0 && (
        <span className="btn-badge">{badge > 9 ? '9+' : badge}</span>
      )}
    </button>
  );
};

export default Button;