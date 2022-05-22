import * as Yup from 'yup';
import { useGet } from '@/hooks/useGet';

import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { TextAreaFieldInput } from '@/components/molecules/TextAraFieldInput/TextAraFieldInput';
import { GenericCreateForm } from './GenericCreateForm';

import { Activity, ActivityDictionaryElement, Status, User } from '@/types';

type CreateActivityProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  activityId?: number | undefined;
  refetchActivities: VoidFunction;
  requestId: number;
};

const GET_ACTIVITIES_QUERY = 'http://localhost:8000/api/activities';
const GET_WORKERS_QUERY = 'http://localhost:8000/api/users/workers';
const GET_ACTIVITY_DICTIONARY = 'http://localhost:8000/api/activity-dictionary';

export function CreateActivity({
  isOpen,
  handleCloseModal,
  activityId,
  refetchActivities,
  requestId,
}: CreateActivityProps) {
  const { data: workers, error: workersError } = useGet<User[]>({ query: GET_WORKERS_QUERY });

  const { data: activityDictionary, error: activityDictionaryError } = useGet<
    ActivityDictionaryElement[]
  >({ query: GET_ACTIVITY_DICTIONARY });

  const initialValues: Activity = {
    sequenceNumber: 1,
    description: '',
    result: '',
    requestId,
    workerId: workers?.at(0)?.id!,
    activityDictionaryActivityType: activityDictionary?.at(0)?.activityType!,
  };

  return (
    <GenericCreateForm<Activity>
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={activityId}
      initialFormValues={initialValues}
      singularName="Activity"
      validationSchema={Yup.object({
        sequenceNumber: Yup.number().required('Required'),
        description: Yup.string().required('Required'),
        result: Yup.string(),
        workerId: Yup.number().required('Required'),
        activityDictionaryActivityType: Yup.string().required('Required'),
        status: Yup.string(),
      })}
      refetchData={refetchActivities}
      query={activityId ? `${GET_ACTIVITIES_QUERY}/${activityId}` : GET_ACTIVITIES_QUERY}
    >
      <TextFieldInput
        label="Sequence number"
        name="sequenceNumber"
        type="number"
        min={1}
        disabled={!!activityId}
      />
      <TextAreaFieldInput label="Description" name="description" />
      <TextAreaFieldInput label="Result" name="result" />
      {workersError ? (
        <p>{workersError}</p>
      ) : (
        <SelectFieldInput label="Worker" name="workerId" isEmpty={workers?.length === 0}>
          {workers?.map(({ firstName, lastName, id }) => (
            <option key={id} value={id}>
              {`${firstName} ${lastName}`}
            </option>
          ))}
        </SelectFieldInput>
      )}
      {activityDictionaryError ? (
        <p>{activityDictionaryError}</p>
      ) : (
        <SelectFieldInput label="Actvity type" name="activityType" isEmpty={workers?.length === 0}>
          {activityDictionary?.map(({ activityName, activityType, estimatedDuration }) => (
            <option key={activityType} value={activityType}>
              {`${activityName} ${estimatedDuration}`}
            </option>
          ))}
        </SelectFieldInput>
      )}
      {activityId ? (
        <SelectFieldInput label="Status" name="status">
          {Object.values(Status).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </SelectFieldInput>
      ) : null}
    </GenericCreateForm>
  );
}
