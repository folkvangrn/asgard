import React from 'react';
import { useParams } from 'react-router-dom';

export function RequestsDetails() {
  const { requestId } = useParams();
  return <div>request detail </div>;
}
