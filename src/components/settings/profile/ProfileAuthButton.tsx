import React from 'react';
import { Button } from '../../ui/Button';
import { cn } from '../../../lib/utils';
import type { User } from '../../../lib/firebase';

interface ProfileAuthButtonProps {
  user: User | null;
  handleSignOut: () => void;
  handleGoogleSignIn: () => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Handling Authentication Actions (Sign In/Out).
 */
export const ProfileAuthButton: React.FC<ProfileAuthButtonProps> = ({
  user,
  handleSignOut,
  handleGoogleSignIn,
}) => {
  return (
    <Button 
      variant={user ? "danger" : "primary"}
      onClick={() => { 
        if (user) {
          handleSignOut();
        } else {
          handleGoogleSignIn();
        }
      }}
      hapticType="medium"
      className={cn(
        "w-full sm:w-auto px-6 py-3.5",
        user && "bg-red-500/10 text-red-500 border border-red-500/20 shadow-none hover:bg-red-500/20"
      )}
    >
      {user ? 'Sign Out' : 'Connect Account'}
    </Button>
  );
};
