import { Grid } from "@mui/material";
import SearchBar from "../form-fields/SearchBar";
import MenuItemFilter from "../form-fields/MenuItemFilter";



export default function SearchFilter({ params, setParams }: ParamsType) {
  return (
    <Grid container justifyContent={'space-between'} sx={{
      my:'24px !important'
    }}>
      <Grid item xs={10}  sm={10} md={10} lg={11}>
        <SearchBar setParams={setParams} params={params} />
      </Grid>
      <Grid item  xs={2} sm={2}  md={2} lg={1} >
        <MenuItemFilter setParams={setParams} params={params}/>
      </Grid>
    </Grid>
  )
}

