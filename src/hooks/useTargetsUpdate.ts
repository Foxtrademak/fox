import { haptic } from '../lib/utils';
import { useSyncContext } from '../context/SyncContext';

interface UseTargetsUpdateProps {
  setIsEditingTargets: (val: boolean) => void;
  weeklyTarget: number;
  monthlyTarget: number;
  showTargetsOnHome: boolean;
}

/**
 * Responsibility: Handling the logic for updating targets and synchronizing with the cloud.
 */
export const useTargetsUpdate = ({
  setIsEditingTargets,
  weeklyTarget,
  monthlyTarget,
  showTargetsOnHome
}: UseTargetsUpdateProps) => {
  const { syncImmediately } = useSyncContext();

  const handleUpdate = () => {
    setIsEditingTargets(false);
    haptic('success');
    syncImmediately({
      weeklyTarget,
      monthlyTarget,
      showTargetsOnHome
    });
  };

  return { handleUpdate };
};
