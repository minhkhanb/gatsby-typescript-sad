/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import React from 'react';
import { Divider, Segment, Table as SemanticTable } from 'semantic-ui-react';
import { Button, Table } from '@src/components/ui';
import { ColumnType, Pagination, SortField, Vehicle } from '@src/components/ui/Table';
import { createKeys } from '@src/utils';
import { DataListState, useDataTable } from '@src/hooks/useDataTable';
import json from '@src/components/List/VehicleList/vehicles.json';

const VehicleList: React.FunctionComponent = () => {
  const fetchData = (_url: string, _totalCountQuery: string) => {
    return new Promise((resolve) => {
      const vehicles = json.vehicles.map((vehicle) => {
        const { favorite, ...item } = vehicle;

        return item;
      });
      resolve(vehicles);
    });
  };

  const fetchDataQuery = (
    _url: string,
    pagination: Pagination,
    sort: SortField,
    filter: string
  ) => {
    return new Promise((resolve) => {
      const { page, limit } = pagination;
      const { sortOrder, sortColumn } = sort;

      const start = (page - 1) * limit;
      const end = start + limit;

      const dataColumn = json.vehicles
        .map((dataColumnItem) => {
          const { favorite, ...item } = dataColumnItem;

          return item;
        })
        .filter((vehicle, idx) => {
          const str = JSON.stringify(vehicle).toLowerCase();

          if (filter !== '') {
            return str.includes(filter.toLowerCase()) && idx >= start && idx < end;
          }

          return idx >= start && idx < end;
        })
        .sort((a: Vehicle, b: Vehicle) => {
          const column = sortColumn as keyof Vehicle;
          const fieldOfA = a[column].toString().toLowerCase();
          const fieldOfB = b[column].toString().toLowerCase();

          if (column === 'id') {
            return sortOrder === 'ascending'
              ? parseInt(fieldOfA) - parseInt(fieldOfB)
              : parseInt(fieldOfB) - parseInt(fieldOfA);
          }

          return sortOrder === 'ascending'
            ? fieldOfA.localeCompare(fieldOfB)
            : fieldOfB.localeCompare(fieldOfA);
        });

      resolve(dataColumn);
    });
  };

  const fetchDataColumn = async (
    totalCountQuery: string,
    query: string,
    pagination: Pagination,
    sort: SortField,
    filter: string
  ) => {
    return Promise.all([
      fetchData(`/api/v1/vehicles?${totalCountQuery}`, totalCountQuery),
      fetchDataQuery(`/api/v1/vehicles?${query}`, pagination, sort, filter),
    ])
      .then(async (values) => {
        const totalData: DataListState['dataColumn'] = values[0] as DataListState['dataColumn'];
        const dataColumn: DataListState['dataColumn'] = values[1] as DataListState['dataColumn'];

        return {
          totalCount: totalData.length,
          dataColumn,
        };
      })
      .catch((error) => {
        console.log(`Failed to load data: ${error.message}`);

        const totalDataColumn = json.vehicles;
        const dataColumn: DataListState['dataColumn'] = json.vehicles.filter(
          (_, index) => index < 10
        );

        return {
          totalCount: totalDataColumn.length,
          dataColumn,
        };
      });
  };

  const {
    isLoading,
    filter,
    pagination,
    sort,
    totalPages,
    totalCount,
    dataColumn,
    onSubmitFilter,
    onChangeLimit,
    onChangePage,
    onSort,
  } = useDataTable({ fetchData: fetchDataColumn });

  const onEdit = () => {
    console.log('onEdit');
  };

  const onDelete = () => {
    console.log('onDelete');
  };

  const columns = createKeys<Vehicle>({
    id: '1',
    make: '',
    model: '',
    year: 2022,
    package: '',
    fuelType: '',
    transmission: '',
  }) as string[];

  const expandColumns: ColumnType[] = [
    {
      key: 'action',
      render: () => {
        return (
          <div className='flex gap-4'>
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
          </div>
        );
      },
    },
    {
      key: 'action1',
      render: () => {
        return (
          <div className='flex gap-4'>
            <Button onClick={onEdit}>Edit1</Button>
            <Button onClick={onDelete}>Delete1</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Segment>
      <Table.Filter
        filter={filter}
        totalCount={totalCount}
        onSubmitFilter={onSubmitFilter}
        loading={isLoading}
      />

      <Divider />

      <Table
        totalColumns={columns.length + expandColumns.length}
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={pagination.page}
        onChangePage={onChangePage}
        column={sort.sortColumn}
        direction={sort.sortOrder}
        handleSort={onSort}
        onChangeLimit={onChangeLimit}
        limit={pagination.limit}
        renderColumns={({ column, direction, handleSort }) => {
          return (
            <SemanticTable.Row>
              {columns.map((key, idx) => (
                <SemanticTable.HeaderCell
                  key={idx}
                  width={1}
                  sorted={column === key ? direction : undefined}
                  onClick={() => handleSort(key)}
                >
                  <span className='capitalize'>{key}</span>
                </SemanticTable.HeaderCell>
              ))}

              {expandColumns.map((_, idx) => (
                <SemanticTable.HeaderCell key={idx} width={1} />
              ))}
            </SemanticTable.Row>
          );
        }}
        renderData={() => {
          return dataColumn.map((vehicle: Vehicle, index: number) => (
            <Table.Row
              key={index}
              item={vehicle}
              render={() => {
                if (!expandColumns.length) return null;

                return expandColumns.map((column, idx) => {
                  const { render, width } = column;

                  return (
                    <SemanticTable.Cell width={width} key={idx}>
                      {render()}
                    </SemanticTable.Cell>
                  );
                });
              }}
            />
          ));
        }}
      />
    </Segment>
  );
};

export default VehicleList;
