import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import { DropdownItemProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem';

const limitOptions: DropdownItemProps[] = [
  { key: '0', value: '10', text: '10' },
  { key: '1', value: '25', text: '25' },
  { key: '2', value: '50', text: '50' },
  { key: '3', value: '100', text: '100' },
];

interface PageSizeProps {
  className?: string;
  limit: number;
  onChangeLimit: (limit: number) => void;
}

const PageSize: React.FunctionComponent<PageSizeProps> = ({ limit, onChangeLimit, className }) => {
  const handleChangeLimit = (_: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
    onChangeLimit(value as number);
  };

  return (
    <div className={className}>
      Records per page:{' '}
      <Dropdown
        inline={true}
        options={limitOptions}
        defaultValue={String(limit)}
        onChange={handleChangeLimit}
      />
    </div>
  );
};

export default PageSize;
