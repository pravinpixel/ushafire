import { TableRow, TableCell, TableHead, TableCellProps } from '@mui/material';

type TableheadInvyProps = {
  headLabel?: {
    id: string;
    label: string;
    headerStyle?: TableCellProps;
  }[];
};
export default function TableHeader({ headLabel }: TableheadInvyProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel?.map((headCell) => {
          return (
            <TableCell key={headCell.id} {...headCell.headerStyle}>
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
