export interface IManagementTableFormat {
  id?: string;
  label: string;
  width?: string;
  align?: 'left' | 'center';
  isHaveSortIcon?: boolean;
}

export type TPair = {
  label: string;
  value: string | number;
  isDateField?: boolean;
};
