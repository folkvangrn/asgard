import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';
import { CreateRequest } from '@/components/organisms/Create/CreateRequest';

import { Request } from '@/types';

import styles from './RequestHeader.module.scss';

export type RequestHeaderProps = {
  error: string | null;
  request: Request | null;
  refetchRequest: VoidFunction;
};

export const RequestHeader = ({ error, request, refetchRequest }: RequestHeaderProps) => {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);

  const headerChilds = [
    {
      title: 'Child info:',
      value: `${request?.vehicleClientFirstName} ${request?.vehicleClientLastName}`,
    },
    {
      title: 'Client phone number:',
      value: request?.vehicleClientPhoneNumber,
    },
    {
      title: 'Client e-mail:',
      value: request?.vehicleClientEmail,
    },
    {
      title: "Client's company:",
      value: request?.vehicleClientCompanyName,
    },
    {
      title: 'Menager info:',
      value: `${request?.managerFirstName} ${request?.managerLastName}`,
    },
    {
      title: 'Vehicle VIN:',
      value: request?.vehicleVin,
    },
    {
      title: 'Vehicle type:',
      value: request?.vehicleClass,
    },
    {
      title: 'Date request:',
      value: request?.dateRequest,
    },
    {
      title: 'Date Closed:',
      value: request?.dateClosed,
    },
    {
      title: 'Status:',
      value: request?.status,
    },
    {
      title: 'Description:',
      value: request?.description,
    },
    {
      title: 'Result:',
      value: request?.result,
    },
  ];

  return error ? (
    <p>There was a problem when fetching request</p>
  ) : (
    <header className={styles.headerSection}>
      <div className={styles.childWrapper}>
        <h3 className={styles.headerTitle}>Request details</h3>
        <Button text="Edit request" className={styles.editButton} onClick={handleOpenModal} />
        <CreateRequest
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          requestId={request?.id}
          refetchRequests={refetchRequest}
        />
      </div>
      <div className={styles.headerInfo}>
        {headerChilds.map(({ title, value }) => (
          <div className={styles.headerChild} key={title}>
            <p>
              {title} <span>{value || '-'}</span>
            </p>
          </div>
        ))}
      </div>
    </header>
  );
};
