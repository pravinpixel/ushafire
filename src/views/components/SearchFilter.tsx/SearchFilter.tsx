import { Grid } from "@mui/material";
import SearchBar from "../form-fields/SearchBar";
import MenuItemFilter from "../form-fields/MenuItemFilter";
import TypeFilter from "../form-fields/TypeFilter";



export default function SearchFilter({ params, setParams,handleData }: ParamsType) {
  return (
    <Grid container justifyContent={'space-between'} sx={{
      my:'24px !important'
    }}>
      <Grid item xs={4}  sm={7} md={7} lg={9.2}>
        <SearchBar setParams={setParams} params={params}  />
      </Grid>
      <Grid item xs={6} sm={3}  md={3} lg={1.7} >
        <TypeFilter setParams={setParams} params={params} handleData={handleData} />
      </Grid>
      <Grid item  xs={2} sm={2}  md={2} lg={1}>
        <MenuItemFilter setParams={setParams} params={params}/>
      </Grid>
    </Grid>
  )
}

