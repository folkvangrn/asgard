import { useGet } from '@/hooks/useGet';
import { useParams } from 'react-router-dom';

import { RequestHeader } from './RequesHeader/RequestHeader';
import { ActivitiesList } from '@/components/organisms/List/ActivitiesList';

import styles from './RequestDetails.module.scss';
import { Request } from '@/types';
const requestUrl = "http://localhost:8000" + "/api/requests/";
export function RequestDetails() {
  const { requestId } = useParams();
  const {
    data: request,
    error,
    isLoading,
    refetchData: refetchRequest,
  } = useGet<Request>({ query: requestUrl + requestId });

  return (
    <main className={styles.detailsWrapper}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <RequestHeader error={error} request={request} refetchRequest={refetchRequest} />
          <ActivitiesList requestId={request?.id} />
        </>
      )}
    </main>
  );
}
