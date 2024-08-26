import { Control } from 'react-hook-form';
import React, { useContext, useCallback } from 'react';

import { Grid, checkboxClasses } from '@mui/material';

import { CheckCloseIcon } from 'theme/svg';

import { RoleFormType, RoleContextType } from 'helper/types/AdminSettingTypes';

import CheckBoxField from 'views/components/form-components/CheckBoxField';

import { RoleContext } from './RoleForm';

type PropsType = {
  control: Control<RoleFormType>;
  index: number;
  childIndex?: string;
  title?: string;
  view: boolean;
  actionArray: string[];
  gridMd: number;
};

const ChildPermissions = React.memo(({ gridMd, control, index, childIndex, title = '', view, actionArray }: PropsType) => {
  const { setValue, watch = false } = useContext<RoleContextType>(RoleContext);
  const accessCompound = actionArray.filter((value) => (view ? value !== 'all' : value));
  const handleCheckAll = useCallback(
    (check: boolean, name: string, module: string) => {
      if (module === 'all') {
        accessCompound.forEach((value) => {
          setValue((name + `${value}${value === 'all' ? '' : '.access'}`) as never, check as never);
        });
      } else {
        const allAccessChecked = accessCompound.every((value) => {
          const fieldName = name + `${value}.access`;
          return watch && watch(fieldName as never);
        });
        setValue((name + 'all') as never, allAccessChecked ? true : false);
      }
    },
    [accessCompound, setValue, watch]
  );

  return (
    <Grid container key={childIndex}>
      <Grid
        item
        xs={gridMd}
        md={gridMd}
        sx={{
          fontSize: '13px',
          fontWeight: 400,
        }}
      >
        {title}
      </Grid>
      {accessCompound.map((nam, key) => {
        const name = childIndex ? `access_manage.${index}.child.${childIndex}.${nam}` : `access_manage.${index}.${nam}`;
        const setName = childIndex ? `access_manage.${index}.child.${childIndex}.` : `access_manage.${index}.`;
        return (
          <Grid item xs={1} md={1} key={key}>
            {(nam === 'all' ? true : watch && watch((name + '.show') as never)) && (
              <CheckBoxField
                control={control}
                name={(name + (nam === 'all' ? '' : '.access')) as never}
                onChange={(e) => handleCheckAll(e, setName, nam)}
                fieldProps={{
                  color: 'success',
                  icon: <CheckCloseIcon />,
                  disabled: view,
                  sx: ({ palette }) => {
                    return {
                      color: palette.error.main,
                      '&.Mui-checked': {
                        color: palette.success.main,
                      },
                      [`&.${checkboxClasses.root}.Mui-disabled `]: {
                        color: palette.error.main,
                        '&.Mui-checked': {
                          color: palette.success.main,
                        },
                      },
                    };
                  },
                }}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
});

export default ChildPermissions;
