import { useModal } from '@/hooks/useModal';
import { Button } from '@/components/atoms/Button/Button';
import { ClientModal } from '@/components/organisms/Modals/ClientModal/ClientModal';
import { VehicleModal } from '@/components/organisms/Modals/VehicleModal/VehicleModal';
import { RequestModal } from '@/components/organisms/Modals/RequestModal/RequestModal';

import styles from './ManagerManageTable.module.scss';

export function ManagerManageTable() {
  const {
    isModalOpen: isClientModalOpen,
    handleCloseModal: handleCloseClientModal,
    handleOpenModal: handleOpenClientModal,
  } = useModal(false);
  const {
    isModalOpen: isVehicleModalOpen,
    handleCloseModal: handleCloseVehicleModal,
    handleOpenModal: handleOpenVehicleModal,
  } = useModal(false);
  const {
    isModalOpen: isRequestModalOpen,
    handleCloseModal: handleCloseRequestModal,
    handleOpenModal: handleOpenRequestModal,
  } = useModal(false);

  return (
    <main className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input placeholder="Search" type="text" />
          <Button text="Add Client" className={styles.addButton} onClick={handleOpenClientModal} />
          <Button
            text="Add Request"
            className={styles.addButton}
            onClick={handleOpenRequestModal}
          />
          <Button
            text="Add Vehicle"
            className={styles.addButton}
            onClick={handleOpenVehicleModal}
          />
          {isClientModalOpen ? (
            <ClientModal isOpen={isClientModalOpen} handleCloseModal={handleCloseClientModal} />
          ) : null}
          {isRequestModalOpen ? (
            <RequestModal isOpen={isRequestModalOpen} handleCloseModal={handleCloseRequestModal} />
          ) : null}
          {isVehicleModalOpen ? (
            <VehicleModal isOpen={isVehicleModalOpen} handleCloseModal={handleCloseVehicleModal} />
          ) : null}
        </div>
        <div className={styles.tableContent}></div>
      </div>
    </main>
  );
}
