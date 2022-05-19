import { useGet } from '@/hooks/useGet';
import { useParams } from 'react-router-dom';

import { Request } from '@/types';

import styles from './RequestDetails.module.scss';

type RequestHeaderProps = {
  error: string | null;
  request: Request | null;
};

const RequestHeader = ({ error, request }: RequestHeaderProps) => {
  return error ? (
    <p>There was a problem when fetching request</p>
  ) : (
    <section>
      <h3>Request details</h3>
      <div>
        <p>
          Client info
          <span>
            {request?.vehicleClientFirstName} {request?.vehicleClientLastName}
          </span>
        </p>
      </div>
    </section>
  );
};

export function RequestDetails() {
  const { requestId } = useParams();
  const {
    data: request,
    error,
    isLoading,
  } = useGet<Request>({ query: `http://localhost:8000/api/requests/${requestId}` });

  return (
    <main className={styles.detailsWrapper}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <RequestHeader error={error} request={request} />
        </>
      )}
    </main>
  );
}
