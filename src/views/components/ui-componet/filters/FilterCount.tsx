import { Avatar } from '@mui/material';

type FilterCountProps = {
  count?: number;
};

const FilterCount = ({ count = 0 }: FilterCountProps) => {
  return count > 0 ? (
    <Avatar
      sx={{
        bgcolor: ({ palette }) => palette.primary.main,
        width: 20,
        height:20,
        fontSize: '11px !important',
      }}
    >
      {count}
    </Avatar>
  ) : null;
};

export default FilterCount;
