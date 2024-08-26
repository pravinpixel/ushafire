import { Box, Stack, BoxProps, Typography, StackProps, FormHelperText } from '@mui/material';

type Props = BoxProps & {
  errorMessage?: string;
  value?: string | number;
  inputProps?: StackProps;
};

function DummyField({ errorMessage, value, inputProps, ...other }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      {...other}
    >
      <Stack
        sx={{
          py: '5px',
          px: 1.5,
          outline: ({ palette }) => `1px solid ${palette.customColor.ligthGreyOne}`,
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'center',
          bgcolor: ({ palette }) => palette.common.white,
          ...inputProps?.sx,
        }}
      >
        <Typography>{value}</Typography>
      </Stack>
      <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
    </Box>
  );
}

export default DummyField;
