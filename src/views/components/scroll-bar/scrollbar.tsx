import React, { memo, forwardRef } from 'react';
import type { SimpleBarOptions } from 'simplebar-core';

import Box from '@mui/material/Box';
import { Theme, SxProps } from '@mui/material';

import { StyledScrollbar, StyledRootScrollbar } from './styles';
// ----------------------------------------------------------------------
type ScrollBarProps = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  other?: SimpleBarOptions;
};
// eslint-disable-next-line react/display-name
const Scrollbar: React.ForwardRefExoticComponent<ScrollBarProps & React.RefAttributes<unknown>> = forwardRef(
  ({ children, sx, other }: ScrollBarProps, ref) => {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (mobile) {
      return (
        <Box ref={ref} sx={{ overflow: 'auto', ...sx }}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar
          scrollableNodeProps={{
            ref,
          }}
          clickOnTrack={false}
          sx={sx}
          {...other}
        >
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  }
);

export default memo(Scrollbar);
