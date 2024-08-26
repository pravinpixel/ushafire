import { Tab, TabProps } from '@mui/material';

type Props = TabProps;

function TabItem({ ...prpos }: Props) {
  return <Tab {...prpos} />;
}

export default TabItem;
