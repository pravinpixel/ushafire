import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  tabValue: number | string;
  value: number | string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, tabValue, ...other } = props;

  return (
    <Box role="tabpanel" hidden={value !== tabValue} id={`simple-tabpanel-${tabValue}`} aria-labelledby={`simple-tab-${tabValue}`} {...other}>
      {tabValue === value && <Box sx={{ pt: 2 }}>{children}</Box>}
    </Box>
  );
}
export default TabPanel;
