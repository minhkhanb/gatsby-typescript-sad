import React from 'react';
import { withProperties } from '@src/utils';
import {
  Pagination as SemanticPagination,
  SemanticWIDTHS,
  Table as SemanticTable,
} from 'semantic-ui-react';
import { PaginationProps } from 'semantic-ui-react/dist/commonjs/addons/Pagination/Pagination';
import PageSize from '@src/components/ui/Table/PageSize';
import Header, { WithChildrenProps } from '@src/components/ui/Table/Header';
import Filter from '@src/components/ui/Table/Filter';
import Row from '@src/components/ui/Table/Row';

export interface ColumnType {
  key: string;
  width?: SemanticWIDTHS;
  render: () => React.ReactNode;
}

interface TableProps {
  totalColumns: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  column?: string;
  limit: number;
  direction?: 'ascending' | 'descending';
  renderColumns: (props: WithChildrenProps) => React.ReactNode;
  renderData: () => React.ReactNode;
  onChangePage(page: number): void;
  handleSort(clickedColumn: string): void;
  onChangeLimit(limit: number): void;
}

export interface Pagination {
  limit: number;
  page: number;
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  package: string;
  fuelType: string;
  transmission: string;
}

export type SortOrder = 'ascending' | 'descending';

export interface SortField {
  sortColumn: string;
  sortOrder?: SortOrder;
}

export interface QueryParam {
  pagination: Pagination;
  sort: SortField;
  filter: string;
}

const Table: React.FunctionComponent<TableProps> = ({
  totalColumns,
  totalCount,
  totalPages,
  currentPage,
  column,
  limit,
  direction,
  renderData,
  renderColumns,
  onChangePage,
  handleSort,
  onChangeLimit,
}) => {
  const handleChangePage = (
    _: React.MouseEvent<HTMLAnchorElement>,
    { activePage }: PaginationProps
  ) => {
    onChangePage(activePage as number);
  };

  return (
    <>
      <div className='flex'>
        <PageSize className='mr-4' limit={limit} onChangeLimit={onChangeLimit} />
        <span>Total count: {totalCount}.</span>
      </div>

      <SemanticTable celled selectable sortable>
        <Header column={column} direction={direction} handleSort={handleSort}>
          {({ column, direction, handleSort }) => renderColumns({ column, direction, handleSort })}
        </Header>

        <SemanticTable.Body>{renderData()}</SemanticTable.Body>

        <SemanticTable.Footer>
          <SemanticTable.Row>
            <SemanticTable.HeaderCell colSpan={totalColumns} textAlign='center'>
              <SemanticPagination
                totalPages={totalPages}
                activePage={currentPage}
                onPageChange={handleChangePage}
              />
            </SemanticTable.HeaderCell>
          </SemanticTable.Row>
        </SemanticTable.Footer>
      </SemanticTable>
    </>
  );
};

export default withProperties(Table, {
  Header,
  Filter,
  Row,
  PageSize,
});
