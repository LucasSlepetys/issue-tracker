import React from 'react';
import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

type colors = 'red' | 'yellow' | 'green';
const statusDefinition: Record<Status, { label: string; color: colors }> = {
  OPEN: {
    label: 'Open',
    color: 'green',
  },
  CLOSED: {
    label: 'Closed',
    color: 'red',
  },
  IN_PROGRESS: {
    label: 'In progress',
    color: 'yellow',
  },
};

const StatusComponent = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusDefinition[status].color}>
      {statusDefinition[status].label}
    </Badge>
  );
};

export default StatusComponent;
