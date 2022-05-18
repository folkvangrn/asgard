import { Form, Formik } from 'formik';
import { useGet } from '@/hooks/useGet';

import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { Button } from '@/components/atoms/Button/Button';

import { RequestStatus, User } from '@/types';

type ListFilterType = {
  status: RequestStatus;
  managerId: number;
};

type RequestListFilterProps = {
  refetchRequests: (query?: string) => void;
  managerId: number;
};

export const RequestListFilter = ({ refetchRequests, managerId }: RequestListFilterProps) => {
  const requestStatuses = Object.values(RequestStatus);
  const initialValues: ListFilterType = {
    status: RequestStatus.Open,
    managerId,
  };

  const handleRefetchRequests = (values: ListFilterType) => {
    const { managerId, status } = values;
    refetchRequests(`http://localhost:8000/api/requests?managerid=${managerId}&status=${status}`);
  };

  const {
    data: managers = [],
    error,
    isLoading,
  } = useGet<User[]>({ query: 'http://localhost:8000/api/users/managers' });

  return (
    <Formik onSubmit={handleRefetchRequests} initialValues={initialValues}>
      <Form>
        {isLoading && <p>Loading managers...</p>}
        {error ? (
          <p>There was a problem with fetching managers</p>
        ) : (
          <SelectFieldInput
            label="Choose manager"
            name="managerId"
            isEmpty={managers?.length === 0}
          >
            {managers &&
              managers?.map(({ id, firstName, lastName }) => (
                <option value={id} key={id}>
                  {`${firstName} ${lastName}`}
                </option>
              ))}
          </SelectFieldInput>
        )}
        <SelectFieldInput label="Status" name="status">
          {requestStatuses.map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </SelectFieldInput>
        <Button text="Filter" type="submit" />
      </Form>
    </Formik>
  );
};
