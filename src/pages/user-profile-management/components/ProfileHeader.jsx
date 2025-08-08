import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ 
  user = {
    name: "Arjun Sharma",
    email: "arjun.sharma@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    joinDate: "2024-03-15",
    totalSessions: 127,
    favoriteScripture: "Bhagavad Gita"
  },
  onEditProfile = () => {},
  onChangeAvatar = () => {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name);

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  const handleSaveName = () => {
    // Save logic would be implemented here
    setIsEditing(false);
    onEditProfile({ ...user, name: editedName });
  };

  return (
    <div className="bg-card border border-border rounded-sacred p-6 glass-morphism">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Avatar Section */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onChangeAvatar}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Icon name="Camera" size={20} className="text-white" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            {isEditing ? (
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e?.target?.value)}
                  className="bg-input border border-border rounded-sacred px-3 py-1 text-lg font-heading font-semibold focus-contemplative"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveName}
                  iconName="Check"
                  iconSize={16}
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedName(user?.name);
                  }}
                  iconName="X"
                  iconSize={16}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <h1 className="text-xl font-heading font-semibold text-foreground">
                  {user?.name}
                </h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  iconName="Edit2"
                  iconSize={16}
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span className="font-caption">
                Joined {formatJoinDate(user?.joinDate)}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground font-body mb-4">
            {user?.email}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-heading font-semibold text-primary">
                {user?.totalSessions}
              </div>
              <div className="text-sm font-caption text-muted-foreground">
                Guidance Sessions
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-lg font-heading font-medium text-accent">
                {user?.favoriteScripture}
              </div>
              <div className="text-sm font-caption text-muted-foreground">
                Favorite Scripture
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onEditProfile}
            iconName="Settings"
            iconPosition="left"
            iconSize={16}
            className="w-full sm:w-auto"
          >
            Edit Profile
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/main-chat-interface'}
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={16}
            className="w-full sm:w-auto"
          >
            Start Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;