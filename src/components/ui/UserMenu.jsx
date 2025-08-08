import React, { useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const UserMenu = ({ 
  user = null, 
  onClose = () => {} 
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleNavigation = (path) => {
    // Navigation logic would be implemented here
    console.log(`Navigating to: ${path}`);
    onClose();
  };

  const handleSignOut = () => {
    // Sign out logic would be implemented here
    console.log('Signing out...');
    onClose();
  };

  const menuItems = [
    {
      icon: 'User',
      label: 'Profile Settings',
      description: 'Manage your spiritual preferences',
      action: () => handleNavigation('/user-profile-management'),
      divider: false
    },
    {
      icon: 'MessageCircle',
      label: 'Chat History',
      description: 'Review past guidance sessions',
      action: () => handleNavigation('/chat-history'),
      divider: false
    },
    {
      icon: 'Bell',
      label: 'Notifications',
      description: 'Daily wisdom and reminders',
      action: () => handleNavigation('/notifications'),
      divider: false
    },
    {
      icon: 'Heart',
      label: 'Saved Guidance',
      description: 'Your bookmarked wisdom',
      action: () => handleNavigation('/saved-guidance'),
      divider: true
    },
    {
      icon: 'Settings',
      label: 'Preferences',
      description: 'Customize your experience',
      action: () => handleNavigation('/preferences'),
      divider: false
    },
    {
      icon: 'HelpCircle',
      label: 'Help & Support',
      description: 'Get assistance and guidance',
      action: () => handleNavigation('/help'),
      divider: false
    },
    {
      icon: 'Info',
      label: 'About VANBA',
      description: 'Learn about our mission',
      action: () => handleNavigation('/about'),
      divider: true
    },
    {
      icon: 'LogOut',
      label: 'Sign Out',
      description: 'End your current session',
      action: handleSignOut,
      divider: false,
      variant: 'destructive'
    }
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-sacred shadow-contemplative-lg glass-morphism z-150 overflow-hidden"
    >
      {/* User Info Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
            {user?.avatar ? (
              <img 
                src={user?.avatar} 
                alt={user?.name || 'User'} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Icon name="User" size={24} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-medium text-foreground truncate">
              {user?.name || 'Spiritual Seeker'}
            </h3>
            <p className="font-caption text-sm text-muted-foreground truncate">
              {user?.email || 'Welcome to your journey'}
            </p>
          </div>
        </div>
      </div>
      {/* Menu Items */}
      <div className="py-2">
        {menuItems?.map((item, index) => (
          <React.Fragment key={index}>
            <button
              onClick={item?.action}
              className={`w-full px-4 py-3 text-left hover:bg-muted transition-contemplative flex items-center space-x-3 group ${
                item?.variant === 'destructive' ? 'hover:bg-destructive/10' : ''
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className={`${
                  item?.variant === 'destructive' ?'text-destructive group-hover:text-destructive' :'text-muted-foreground group-hover:text-foreground'
                } transition-colors`}
              />
              <div className="flex-1 min-w-0">
                <div className={`font-body text-sm font-medium ${
                  item?.variant === 'destructive' ?'text-destructive' :'text-foreground'
                }`}>
                  {item?.label}
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  {item?.description}
                </div>
              </div>
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            </button>
            {item?.divider && (
              <div className="mx-4 my-2 border-t border-border"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <p className="font-caption text-xs text-muted-foreground text-center">
          May your spiritual journey be filled with wisdom and peace
        </p>
      </div>
    </div>
  );
};

export default UserMenu;