import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Menu, alpha, Button, MenuItem, Typography, outlinedInputClasses } from '@mui/material';

import { FilterIcon, CommentIcon } from 'theme/svg';

import { pxToRem } from 'helper/GlobalHelper';
import { OptionsType, FrontEndName } from 'helper/types/GlobalTypes';
import { useRouter, useResponsive, useModuleFinder } from 'helper/CustomHooks';

import { useEssentialList } from 'store/hooks/EssentialHooks';

import AsyncSelectField from 'views/components/form-components/AsyncSelectField';

interface SearchBy extends OptionsType {
  value: EssentialType;
  fnLink: FrontEndName;
}

const menus: SearchBy[] = [
  {
    value: 'Product',
    label: 'By Product',
    fnLink: 'product-inventory',
  },
  {
    value: 'Customer',
    label: 'By Customer',
    fnLink: 'customer-group',
  },
];

type GlobalSearch = {
  searchBy: SearchBy;
  search?: string;
  typeSearch?: string;
};

/**
 * This file is part of AutoPack.
 *
 * Its Search Field file of Top bar
 *
 */
const SearchButtons = () => {
  const mobile = useResponsive('down', 'lg');
  const { control, setValue, watch } = useForm<GlobalSearch>({
    defaultValues: {
      searchBy: menus[0],
      search: '',
      typeSearch: '',
    },
  });

  const [search] = useSearchParams();
  const searchQuery = search.get('query');
  const searchBy = watch('searchBy');
  // const typeSearch = watch('typeSearch');
  const { push, getPathById, navigateById, getPath } = useRouter();
  const finder = useModuleFinder();
  const { data } = useEssentialList({
    params: {
      include: [searchBy.value],
      // search: typeSearch,
    },
  });
  const handleSearchPath = (fendName: FrontEndName) => finder.find(fendName);
  const SearchPath = handleSearchPath(searchBy.fnLink)?.addMore?.find((value) => value?.fend_component === 'search')?.path;
  const ViewProduct = handleSearchPath(searchBy.fnLink)?.view;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e?: SearchBy) => {
    e?.value && setValue('searchBy', e);
    const path = getPath();

    searchBy?.value !== e?.value && push(path.pathname);

    setAnchorEl(null);
  };

  useEffect(() => {
    if (searchQuery) {
      setValue('search', searchQuery);
    } else {
      setValue('search', '');
    }
  }, [searchQuery, setValue]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: mobile ? '100%' : '70%', gap: 3 }}>
      <Button
        variant="export"
        aria-haspopup="true"
        disableElevation
        sx={{
          minWidth: '10rem',
        }}
        startIcon={
          <FilterIcon
            fontSize="large"
            sx={{
              marginTop: 0.8,
              color: ({ palette }) => palette.grey[600],
            }}
          />
        }
        // endIcon={
        //   <ArrowDropDownIcon
        //     sx={{
        //       color: ({ palette }) => palette.info.main,
        //     }}
        //   />
        // }
        onClick={handleClick}
      >
        <Typography variant="body2" noWrap>
          {searchBy.label}
        </Typography>
      </Button>
      <Menu
        id="search-button"
        MenuListProps={{
          'aria-labelledby': 'search-button',
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => handleClose()}
      >
        {menus?.map((menu) => (
          <MenuItem
            sx={{
              py: 1.5,
              minWidth: '10rem',
              color: ({ palette }) => (searchBy.value === menu.value ? palette.primary.main : palette.common.black),
              '&:hover': {
                bgcolor: ({ palette }) => alpha(palette.primary.main, 0.16),
              },
              borderBottom: ({ palette }) => ` 1px solid ${palette.divider}`,
            }}
            key={menu.value}
            onClick={() => handleClose(menu)}
          >
            <Typography variant="body2" noWrap>
              {menu.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
      <AsyncSelectField
        name="search"
        control={control}
        options={data?.[searchBy.value] || []}
        addName={searchBy.value}
        textFieldProps={{
          placeholder: 'Search...',
          InputProps: {
            startAdornment: (
              <CommentIcon
                sx={{
                  color: ({ palette }) => palette.info.main,
                  ml: 1,
                }}
              />
            ),
            endAdornment: (
              <ArrowDropDownIcon
                sx={{
                  color: ({ palette }) => palette.info.main,
                  fontSize: pxToRem(40),
                }}
              />
            ),
            type: 'search',
          },
          sx: {
            [`& .${outlinedInputClasses.root}`]: {
              py: '2.5px !important',
            },
          },
        }}
        fieldProps={{
          disableClearable: true,
          freeSolo: true,
        }}
        onChange={(res) => {
          if (typeof res === 'string') {
            push(SearchPath + '?query=' + res);
            setValue('typeSearch', res);
            setValue('search', { label: res, value: '' } as never);
          } else {
            const pathToRedirect = getPathById({ path: ViewProduct?.path, id: res?.value as string });
            // pushById({ path: ViewProduct?.path, access: ViewProduct?.access, id: res?.value as string });
            navigateById({
              path: pathToRedirect,

              access: ViewProduct?.access,
              query: {
                query: res?.label || '',
              },
            });
            setValue('typeSearch', res?.label);
          }
        }}
        onSearchChange={(e) => setValue('typeSearch', e)}
      />
      <Button
        sx={{
          width: '15%',
        }}
        onClick={() => push(SearchPath + '?query=' + watch('typeSearch'))}
      >
        <Typography variant="body2" noWrap>
          Search
        </Typography>
      </Button>
    </Box>
  );
};

export default SearchButtons;
