import { Trophy } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { TargetsModalContent } from './targets/TargetsModalContent';
import { useTargetsUpdate } from '../../hooks/useTargetsUpdate';
import { useUI } from '../../context/UIContext';
import { useData } from '../../context/DataContext';
import { useSettings } from '../../context/SettingsContext';

/**
 * Responsibility: Final Pure Orchestrator for the Profit Targets Modal.
 * Note: Now acts as a "Smart Component" pulling data directly from Contexts.
 * Focused exclusively on:
 * 1. Modal Lifecycle (isOpen, onClose).
 * 2. Modal Configuration (Title, Subtitle, Icon, Theme).
 * 3. Connecting Logic (Hook) to Content.
 */
export const TargetsModal = () => {
  const { theme } = useUI();
  const {
    weeklyTarget,
    setWeeklyTarget,
    monthlyTarget,
    setMonthlyTarget,
    showTargetsOnHome,
    setShowTargetsOnHome,
  } = useData();
  const {
    isEditingTargets,
    setIsEditingTargets,
  } = useSettings();
  
  const { handleUpdate } = useTargetsUpdate({
    setIsEditingTargets,
    weeklyTarget,
    monthlyTarget,
    showTargetsOnHome
  });

  return (
    <Modal
      isOpen={isEditingTargets}
      onClose={() => setIsEditingTargets(false)}
      theme={theme}
      title="Profit Targets"
      subtitle="Set Your Ambitions"
      icon={<Trophy className="w-8 h-8 text-amber-500/60" />}
      className="p-10"
    >
      <TargetsModalContent 
        showTargetsOnHome={showTargetsOnHome}
        setShowTargetsOnHome={setShowTargetsOnHome}
        weeklyTarget={weeklyTarget}
        setWeeklyTarget={setWeeklyTarget}
        monthlyTarget={monthlyTarget}
        setMonthlyTarget={setMonthlyTarget}
        handleUpdate={handleUpdate}
        theme={theme}
      />
    </Modal>
  );
};
