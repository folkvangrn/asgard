import { Form, Formik } from 'formik';
import { useAuth, useGet } from '@/hooks';

import { SelectFieldInput } from '@/components/atoms/Inputs/SelectFieldInput/SelectFieldInput';
import { Button } from '@/components/atoms/Button/Button';
import { addIdToRole, pluralize } from '@/helpers/others';

import { Status, User, UserRole } from '@/types';
import styles from './ListFilter.module.scss';

const requestUrl = "http://192.168.1.234:8000";

type ListFilterType = {
  status: Status | 'ALL';
  userId: number;
};

type ListFilterProps = {
  refetchData: (query?: string) => void;
};

export const ListFilter = ({ refetchData }: ListFilterProps) => {
  const { user } = useAuth();
  const pluralizedSingularName = pluralize(user?.role!);
  const requestStatuses = ['ALL', ...Object.values(Status)];

  const initialValues: ListFilterType = {
    status: 'ALL',
    userId: user?.id || 0,
  };

  const handleRefetchData = (values: ListFilterType) => {
    const { userId, status } = values;
    const dataType = user?.role === UserRole.Manager ? 'requests' : 'activities';
    const statusQuery = status === 'ALL' ? '' : `&status=${status}`;
    refetchData(
      requestUrl + `/api/${dataType}?${addIdToRole(user?.role)}=${userId}${statusQuery}`,
    );
  };

  const {
    data: users = [],
    error,
    isLoading,
  } = useGet<User[]>({ query: requestUrl + `/api/users/${pluralizedSingularName}` });

  return (
    <Formik onSubmit={handleRefetchData} initialValues={initialValues}>
      <Form className={styles.listWrapper}>
        <div className={styles.inputsWrapper}>
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
        </div>
        <Button text="Filter" type="submit" className={styles.filterButton} />
      </Form>
    </Formik>
  );
};
