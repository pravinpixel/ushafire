import { get } from 'lodash';
import { Control } from 'react-hook-form';

import { Box, Grid, Divider } from '@mui/material';

import { RoleFormType } from 'helper/types/AdminSettingTypes';
import { ModuleType, capitalizeFirstLetter } from 'helper/GlobalHelper';

import Scrollbar from 'views/components/scroll-bar/scrollbar';

import ChildPermissions from './ChildPermission';

type PropsType = {
  permissions: ModuleType[];
  control: Control<RoleFormType>;
  md?: 8 | 12;
  view?: boolean;
};

export default function Permission({ permissions, control, md = 12, view = false }: PropsType) {
  const actionArray = ['all', 'view', 'add', 'edit', 'delete', 'export'];
  const gridProps = view ? actionArray.length : actionArray.length - 1;
  return (
    <Grid container>
      <Grid item xs={12} md={md} p={4} paddingY={0}>
        <Grid
          container
          sx={{
            fontSize: '13px',
            fontWeight: 400,
          }}
          alignItems={'center'}
        >
          <Grid item xs={gridProps} md={gridProps}></Grid>
          {actionArray
            .filter((value) => (view ? value !== 'all' : value))
            .map((values) => {
              return (
                <Grid item xs={1} md={1}>
                  {capitalizeFirstLetter(values)}
                </Grid>
              );
            })}
        </Grid>
        <Scrollbar
          sx={{
            height: view ? '85vh' : '28vh',
            overflowX: 'hidden',
          }}
          other={{
            autoHide: false,
          }}
        >
          {permissions.map((field, index) => {
            const childPermissions = get(field, 'child', []);
            const label = get(field, 'name', '');
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <Box
                  sx={{
                    fontWeight: 500,
                    fontSize: '16px',
                  }}
                >
                  {label}
                </Box>
                <Divider />
                <Grid container key={index}>
                  <Grid
                    item
                    xs={12}
                    md={7}
                    sx={{
                      fontSize: '13px',
                      fontWeight: 400,
                    }}
                  ></Grid>
                  {childPermissions.length >= 1 ? (
                    childPermissions.map((child, childIndex) => (
                      <ChildPermissions
                        key={child._id}
                        actionArray={actionArray}
                        title={child?.name}
                        control={control}
                        index={index}
                        childIndex={`${childIndex}`}
                        view={view}
                        gridMd={gridProps}
                      />
                    ))
                  ) : (
                    <ChildPermissions
                      key={field._id}
                      view={view}
                      actionArray={actionArray}
                      title={label}
                      control={control}
                      index={index}
                      childIndex={undefined}
                      gridMd={gridProps}
                    />
                  )}
                </Grid>
              </Box>
            );
          })}
        </Scrollbar>
      </Grid>
    </Grid>
  );
}
