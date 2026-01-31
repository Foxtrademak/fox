import React from 'react';
import { useTrade } from '../../context/TradeContext';
import { useSettings } from '../../context/SettingsContext';
import { InitialCapitalModal } from '../modals/InitialCapitalModal';
import { WithdrawalModal } from '../modals/WithdrawalModal';
import { DeleteConfirmationModal } from '../modals/DeleteConfirmationModal';
import { MT5ImportPreviewModal } from '../modals/MT5ImportPreviewModal';

/**
 * Responsibility: Renders all app-wide modals.
 * Isolated from AppLayout to prevent full-layout re-renders when a modal opens/closes.
 */
export const ModalOrchestrator = React.memo(function ModalOrchestrator() {
    const { isAddingWithdrawal, recordToDelete } = useTrade();
    const { isEditingInitial } = useSettings();

    return (
        <>
            {/* MT5 Import Preview Modal */}
            <MT5ImportPreviewModal />

            {/* Modals */}
            {isEditingInitial && <InitialCapitalModal />}
            {isAddingWithdrawal && <WithdrawalModal />}
            {recordToDelete && <DeleteConfirmationModal />}
        </>
    );
});
