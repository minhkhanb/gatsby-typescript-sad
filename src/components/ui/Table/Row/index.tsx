/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Table } from 'semantic-ui-react';

interface TableRowProps {
  item: any;
  onClick?: (item: any) => void;
  render: () => React.ReactNode;
}

function TableRow({ item, render }: TableRowProps) {
  return (
    <Table.Row>
      {Object.keys(item).map((prop, idx) => {
        return <Table.Cell key={idx}>{item[prop]}</Table.Cell>;
      })}

      {render()}
    </Table.Row>
  );
}

export default TableRow;
