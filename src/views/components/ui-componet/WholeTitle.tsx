import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

type Props = {
  title: string;
  count?: number | boolean;
  variant?: Variant;
  subtitle?: string;
};

const WholeTitle = ({ title, count = 0, variant = 'h4', subtitle }: Props) => {
  const TitleCount = count && count !== 0 ? `(${count} ${subtitle ?? title?.split(' ')?.[0]}s)` : '';
  return (
    <>
      <Typography variant={variant} noWrap>
        {title}
      </Typography>
      <Typography variant="subtitle1" noWrap fontStyle={'italic'} fontWeight={({ typography }) => typography.fontWeightLight}>
        {TitleCount}
      </Typography>
    </>
  );
};

export default WholeTitle;
