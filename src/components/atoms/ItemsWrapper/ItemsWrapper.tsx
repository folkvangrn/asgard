type ItemsWrapperProps = {
  errorMessage: string | null;
  isEmpty: boolean;
  isLoading: boolean;
  children: JSX.Element[] | undefined;
};

export function ItemsWrapper({ errorMessage, isLoading, isEmpty, children }: ItemsWrapperProps) {
  if (isLoading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return isEmpty ? <p>No entries found</p> : <>{children}</>;
}
