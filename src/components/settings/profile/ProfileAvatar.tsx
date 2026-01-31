import React from 'react';
import { UserCircle, Cloud } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { User } from '../../../lib/firebase';

interface ProfileAvatarProps {
  user: User | null;
  profileImgError: boolean;
  setProfileImgError: (val: boolean) => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Displaying the user's profile image or fallback icons.
 */
export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  user,
  profileImgError,
  setProfileImgError,
  theme
}) => {
  return (
    <div className={cn(
      "w-14 h-14 ios-card-mini p-0 overflow-visible flex items-center justify-center border shrink-0",
      theme === 'light' ? "bg-white/40 border-white/60" : "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-white/10"
    )}>
      {user ? (
        (() => {
          const photoURL = user.photoURL || user.providerData?.[0]?.photoURL;
          if (photoURL && !profileImgError) {
            return (
              <img 
                src={photoURL} 
                alt={user.displayName || ''} 
                className="w-full h-full object-cover rounded-[inherit]" 
                onError={() => {
                  console.error("Profile image failed to load:", photoURL);
                  setProfileImgError(true);
                }}
              />
            );
          }
          return (
            <div className="w-full h-full flex items-center justify-center bg-indigo-500/10 rounded-[inherit]">
              <UserCircle className="w-8 h-8 text-indigo-400" />
            </div>
          );
        })()
      ) : (
        <Cloud className="w-7 h-7 text-indigo-400" />
      )}
    </div>
  );
};
