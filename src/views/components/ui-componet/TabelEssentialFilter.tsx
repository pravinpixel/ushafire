import { Grid } from '@mui/material';

import { PaginationInterFace, FilterInputsMenusTypes } from 'helper/types/TableTypes';

import { useEssentialList } from 'store/hooks/EssentialHooks';

// import FilterButton from './buttons/FilterButton';
import FilterButton from './buttons/FilterButton';

type Props = {
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  essentialFilter?: FilterInputsMenusTypes[];
};

const TabelEssentialFilter = ({ params, setParams, essentialFilter = [] }: Props) => {
  // const filterNames = essentialFilter?.map((essential) => essential.name);

  const essentialNames = essentialFilter?.map((essential) => essential.essentialName);
  const { data: essentialList } = useEssentialList({
    params: {
      include: essentialNames,
      enabled: essentialFilter?.length > 0,
    },
  });
  const MenuItems: FilterInputsMenusTypes[] =
    essentialFilter?.map((value) => {
      return {
        ...value,
        // name: value.essentialName,
        menus: essentialList?.[value.essentialName] || [],
        label: value.label,
      };
    }) || [];
  return MenuItems?.map((menu, index) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        {/* <MuiltiSelectAutoComplete
           key={`multi-${index}`}
           name={menu.essentialName}
           multiple={!menu?.single}
           options={menu?.menus || []}
           label={menu?.label}
           params={params}
           setParams={setParams}
           defaultValue={menu?.defaultValue}
         /> */}
        <FilterButton
          name={menu.essentialName}
          label={menu.label}
          menus={menu?.menus}
          params={params}
          setParams={setParams}
          defaultValue={menu?.defaultValue}
          multiple={!menu?.single}
        />
      </Grid>
    );
  });
};

export default TabelEssentialFilter;
