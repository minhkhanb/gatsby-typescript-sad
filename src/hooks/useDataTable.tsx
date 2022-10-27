/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { Pagination, QueryParam, SortField, SortOrder } from '../components/ui/Table';
import { useQuery } from 'react-query';
import {
  StringParam,
  useQueryParams as useQueryParamsLib,
  QueryParamConfigMap,
  QueryParamConfig,
  withDefault,
  NumberParam,
} from 'use-query-params';
import json from '@src/components/List/VehicleList/vehicles.json';

type T = any;

export const constructQuery = (pagination: Pagination, sort: SortField, filter: string): string => {
  const params = [];

  params.push(`_limit=${pagination.limit}`);
  params.push(`_page=${pagination.page}`);
  params.push(`q=${encodeURIComponent(filter)}`);
  params.push(`_sort=${sort.sortColumn}`);

  if (sort.sortOrder) {
    params.push(`_order=${sort.sortOrder === 'ascending' ? 'asc' : 'desc'}`);
  }

  return params.join('&');
};

export interface DataListState {
  totalCount: number;
  dataColumn: T[];
}

interface Q extends QueryParamConfigMap {
  filter: QueryParamConfig<string, string>;
  page: QueryParamConfig<number, number>;
  limit: QueryParamConfig<number, number>;
}

interface DataTableOptions {
  fetchData: (
    totalCountQuery: string,
    query: string,
    pagination: Pagination,
    sort: SortField,
    filter: string
  ) => Promise<DataListState>;
}

export const useDataTable = ({ fetchData }: DataTableOptions) => {
  const [queryParams, setQueryParams] = useQueryParamsLib<Q>({
    filter: withDefault(StringParam, ''),
    page: withDefault(NumberParam, 1),
    limit: withDefault(NumberParam, 10),
    sortColumn: withDefault(StringParam, 'id'),
    sortOrder: withDefault(StringParam, 'ascending'),
  });

  const { filter, page, limit, sortColumn, sortOrder } = queryParams;
  const pagination: Pagination = {
    page,
    limit,
  };

  const sort: SortField = {
    sortColumn,
    sortOrder,
  };

  const setFilter = (filter: string) => {
    setQueryParams(
      {
        filter: filter,
      },
      'replaceIn'
    );
  };

  const setPagination = (pagination: Pagination) => {
    setQueryParams(
      {
        ...pagination,
      },
      'replaceIn'
    );
  };

  const setSort = (sortField: SortField) => {
    setQueryParams(
      {
        ...sortField,
      },
      'replaceIn'
    );
  };

  const query = useQuery<DataListState>(
    ['dataColumn', { pagination, filter, sort }],
    async ({ queryKey }) => {
      const { pagination, filter, sort } = queryKey[1] as QueryParam;

      const query = constructQuery(pagination, sort, filter);

      // Make a request without limit first to get the total number of data.
      let totalCountQuery = '';
      if (filter !== '') {
        totalCountQuery = `q=${encodeURIComponent(filter)}`;
      }

      return fetchData(totalCountQuery, query, pagination, sort, filter)
        .then(async (values) => {
          const { totalCount, dataColumn } = values;

          return {
            totalCount,
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
    },
    {
      keepPreviousData: true,
      initialData: {
        totalCount: 0,
        dataColumn: [],
      },
    }
  );

  const onSort = (clickedColumn: string) => {
    const { sortColumn, sortOrder } = sort;

    let newOrder: SortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
    if (sortColumn !== clickedColumn) {
      newOrder = 'ascending';
    }

    setPagination({ ...pagination, page: 1 });
    setSort({ sortColumn: clickedColumn, sortOrder: newOrder });
  };

  const onSubmitFilter = (value: string) => {
    if (value !== filter) {
      setFilter(value);
      setPagination({ ...pagination, page: 1 });
    }
  };

  const onChangeLimit = (limit: number) => {
    if (limit !== pagination.limit) {
      setPagination({ limit, page: 1 });
    }
  };

  const onChangePage = (page: number) => {
    if (page !== pagination.page) {
      setPagination({ ...pagination, page });
    }
  };

  return {
    onSort,
    onSubmitFilter,
    onChangeLimit,
    onChangePage,
    filter,
    pagination,
    sort,
    isLoading: query.isLoading,
    totalPages: Math.ceil((query.data?.totalCount || 0) / pagination.limit),
    totalCount: query.data?.totalCount || 0,
    dataColumn: query.data?.dataColumn || [],
  };
};
