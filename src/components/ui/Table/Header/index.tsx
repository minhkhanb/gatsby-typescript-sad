import { Table } from 'semantic-ui-react';
import React from 'react';

interface TableHeaderProps {
  column?: string;
  direction?: 'ascending' | 'descending';
  handleSort: (column: string) => void;
  children: (props: WithChildrenProps) => React.ReactNode;
}

export interface WithChildrenProps {
  column?: string;
  direction?: 'ascending' | 'descending';
  handleSort: (column: string) => void;
}

const TableHeader: React.FunctionComponent<TableHeaderProps> = ({
  column,
  direction,
  handleSort,
  children,
}) => {
  return <Table.Header>{children({ column, direction, handleSort })}</Table.Header>;
};

export default TableHeader;
