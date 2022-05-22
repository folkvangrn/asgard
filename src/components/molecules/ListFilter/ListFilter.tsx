import { Form, Formik } from 'formik';
import { useAuth, useGet } from '@/hooks';

import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { Button } from '@/components/atoms/Button/Button';
import { addIdToRole, pluralize } from '@/helpers/others';

import { Status, User, UserRole } from '@/types';

type ListFilterType = {
  status: Status;
  userId: number;
};

type ListFilterProps = {
  refetchData: (query?: string) => void;
};

export const ListFilter = ({ refetchData }: ListFilterProps) => {
  const { user } = useAuth();
  const pluralizedSingularName = pluralize(user?.role!);
  const requestStatuses = Object.values(Status);

  const initialValues: ListFilterType = {
    status: Status.Open,
    userId: user?.id || 0,
  };

  const handleRefetchData = (values: ListFilterType) => {
    const { userId, status } = values;
    const dataType = user?.role === UserRole.Manager ? 'requests' : 'activities';

    refetchData(
      `http://localhost:8000/api/${dataType}?${addIdToRole(user?.role)}=${userId}&status=${status}`,
    );
  };

  const {
    data: users = [],
    error,
    isLoading,
  } = useGet<User[]>({ query: `http://localhost:8000/api/users/${pluralizedSingularName}` });

  return (
    <Formik onSubmit={handleRefetchData} initialValues={initialValues}>
      <Form>
        {isLoading && <p>Loading {pluralizedSingularName}...</p>}
        {error ? (
          <p>There was a problem with fetching {pluralizedSingularName}</p>
        ) : (
          <SelectFieldInput
            label={`Choose ${user?.role}`}
            name="userId"
            isEmpty={users?.length === 0}
          >
            {users &&
              users?.map(({ id, firstName, lastName }) => (
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
