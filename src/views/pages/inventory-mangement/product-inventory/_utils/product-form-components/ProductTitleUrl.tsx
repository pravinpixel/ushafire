import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Grid, IconButton, InputLabel, outlinedInputClasses } from '@mui/material';

import { CopyIcon } from 'theme/svg';

import { MenuItemType } from 'helper/types/GlobalTypes';
import { ProductFormType } from 'helper/types/inventory-management/ProductInventoryType';

import InputField from 'views/components/form-components/InputField';
import MoreVertField from 'views/components/form-components/MoreVertField';

const ProductTitleUrl = () => {
  const { control, watch } = useFormContext<ProductFormType>();
  const { fields, append, remove } = useFieldArray({
    name: 'productUrls',
    control,
  });
  const MenuItem: (index: number) => MenuItemType[] = (index) =>
    fields.length !== 1
      ? [
          {
            label: 'Add',
            menuItemProps: {
              onClick: () =>
                append({
                  title: '',
                  url: '',
                }),
            },
          },
          {
            label: 'Delete',
            action: 'fieldDelete',
            menuItemProps: {
              onClick: () => remove(index),
            },
          },
        ]
      : [
          {
            label: 'Add',
            menuItemProps: {
              onClick: () =>
                append({
                  title: '',
                  url: '',
                }),
            },
          },
        ];
  return (
    <>
      <Grid item xs={12} md={12} />
      <Grid item xs={5} md={5}>
        <InputLabel>Title</InputLabel>
      </Grid>
      <Grid item xs={5} md={5}>
        <InputLabel>URL</InputLabel>
      </Grid>
      <Grid item xs={2} md={2}></Grid>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Grid item xs={5} md={5}>
            <InputField
              name={`productUrls.${index}.title`}
              control={control}
              fieldProps={{
                placeholder: 'Enter Title',
              }}
            />
          </Grid>
          <Grid item xs={5} md={5}>
            <InputField
              name={`productUrls.${index}.url`}
              control={control}
              fieldProps={{
                placeholder: 'Enter URL',
                sx: {
                  [`& .${outlinedInputClasses.inputAdornedEnd}`]: {
                    borderRight: ({ palette }) => `1px solid ${palette.divider}`,
                  },
                },
                InputProps: {
                  endAdornment: (
                    <IconButton onClick={() => navigator.clipboard.writeText(watch(`productUrls.${index}.url`))}>
                      <CopyIcon />
                    </IconButton>
                  ),
                },
              }}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <MoreVertField id={field?._id} menuItem={MenuItem(index)} name="productUrls" control={control as never} />
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
};

export default ProductTitleUrl;
