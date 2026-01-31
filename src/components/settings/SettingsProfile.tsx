import React from 'react';
import { Card } from '../ui/Card';
import { ProfileAvatar } from './profile/ProfileAvatar';
import { ProfileInfo } from './profile/ProfileInfo';
import { ProfileAuthButton } from './profile/ProfileAuthButton';
import { ProfileSyncButton } from './profile/ProfileSyncButton';
import { useUI } from '../../context/UIContext';
import { useSyncContext } from '../../context/SyncContext';

/**
 * Responsibility: Orchestrating User Profile and Synchronization Settings.
 * Coordinates:
 * 1. ProfileAvatar: User image management.
 * 2. ProfileInfo: Identity display.
 * 3. ProfileAuthButton: Authentication actions.
 * 4. ProfileSyncButton: Manual synchronization.
 * 
 * Note: Now acts as a "Smart Component" pulling data directly from Contexts.
 */
export const SettingsProfile: React.FC = () => {
  const { theme, profileImgError, setProfileImgError } = useUI();
  const {
    user,
    handleSignOut,
    handleGoogleSignIn,
    handleManualSync,
    isSyncing,
  } = useSyncContext();

  return (
    <Card className="p-4 sm:p-6 shadow-2xl transition-all duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          {/* Responsibility 1: Profile Avatar */}
          <ProfileAvatar 
            user={user}
            profileImgError={profileImgError}
            setProfileImgError={setProfileImgError}
            theme={theme}
          />
          
          {/* Responsibility 2: Identity Info */}
          <ProfileInfo 
            user={user}
            theme={theme}
          />
        </div>

        {/* Responsibility 3: Authentication Actions */}
        <ProfileAuthButton 
          user={user}
          handleSignOut={handleSignOut}
          handleGoogleSignIn={handleGoogleSignIn}
          theme={theme}
        />
      </div>

      {/* Responsibility 4: Manual Cloud Sync */}
      {user && (
        <ProfileSyncButton 
          handleManualSync={handleManualSync}
          isSyncing={isSyncing}
          theme={theme}
        />
      )}
    </Card>
  );
};
