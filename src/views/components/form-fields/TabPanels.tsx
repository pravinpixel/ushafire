import { Box, Divider, Stack, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import  { Dispatch, ReactNode, SetStateAction, SyntheticEvent, useState } from "react";
import SearchFilter from "../SearchFilter.tsx/SearchFilter";
import ResponsiveSideBar from "../sidebar/ResponsiveSideBar";
import ProgressBar from "../ProgressBar";
import { fontWeightMedium, fontWeightRegular } from "../../../utils/theme/typography";
import { Typography } from "@mui/material";
import { FilterCancelIcons } from "../../../utils/theme/svg";


type TabListType = {
	label: string;
	value: string;
	component: ReactNode | JSX.Element;
};
const TypeFilterView = ({value,handleClearAll,handleRemoveItem}:{value:FilterTypes[],handleClearAll:()=>void,handleRemoveItem:(itemToRemove: number)=>void})=>{
	// const {value,handleClearAll,handleRemoveItem}=props;
	return(
		<Box sx={{"& .MuiDivider-root":{
			width:'0px !important'
		},marginBottom:2,marginTop:-0.5}}>
		<Stack direction="row"
              spacing={1.5}  >
			<Box>
	       <Box sx={{borderRadius:'90px', border:'1px solid rgba(0, 0, 0, 1)',padding:'4px 10px 4px 10px',cursor:'pointer',width:'64px',}} onClick={handleClearAll}>
			<Typography variant="f12" fontWeight={fontWeightRegular} sx={{color:'rgba(0, 0, 0, 1)',whiteSpace:'nowrap',lineHeight:'16.2px',display:'flex',alignItems:'center',justifyContent:'center'}}>
			Clear all
			</Typography>
			</Box>
			</Box>
	       <Divider orientation="vertical"  flexItem  sx={{borderColor:'rgba(0, 0, 0, 0.2)'}}/>
		   <Box display={'flex'} flexWrap={'wrap'} gap={{md:'4px',xs:'10px'}}>
		   {
			value?.map((item:FilterTypes)=>(
				<Box  sx={{borderRadius:'90px', border:'1px solid rgba(136, 52, 76, 1)',padding:'4px 10px 4px 10px',flexWrap:'wrap',position:'relative',minWidth:'63px',}}>
				<Typography variant="f12" fontWeight={fontWeightRegular} sx={{color:'rgba(136, 52, 76, 1)',lineHeight:'16.2px',display:'flex',alignItems:'center',justifyContent:'center'}} > {item.title}</Typography> 
				<Box sx={{position:'absolute',top: "-14px",
									right: "-1px",cursor:'pointer'}}  onClick={() => handleRemoveItem(item.value as number)}>
					{/* <img src={typeCancelIcon} alt="cancel-icon" width={'12'} height={'12'}/> */}
					<FilterCancelIcons sx={{width:12,height:12}}/>
				</Box>
			   </Box>
			))
		   }
	      </Box>
		</Stack>
		</Box>
	)
}

const TabPanels = ({
	tabList = [],
	params,
	setParams,
	isLoading = false,
	
}: {
	tabList: TabListType[];
	params: TaskPagination;
	setParams: Dispatch<SetStateAction<TaskPagination>>;
	isLoading?: boolean;
	
}) => {
	const theme = useTheme();
	const media = useMediaQuery(theme.breakpoints.down("md"));
	const [titleValue,setTitleValue]=useState<FilterTypes[]>([])
	const handleChange = (e: SyntheticEvent, tab: TaskPagination["tab"]) => {
		e.preventDefault();
		setTitleValue([]);
		setParams(() => ({
			tab,
			page:0,
			per_page: 20,
			search : null,
			deadline :[],
			priority_id : [],
			sort_column : null,
			task_category_id:[],
		}));
	};
	
	
	const handleData=(pre:FilterTypes)=>{
		// setTitleValue(()=>(

		// ))
		const temp= titleValue.map((item : FilterTypes)=> (item.value))
		const data= titleValue;
		if(!temp.includes(pre.value)){
			data.push(pre)
		setTitleValue(data);	
		}else{
			const remove = data.filter((item: FilterTypes) => item.value !== pre.value);
			setTitleValue(remove)
		}
	

	}
	const handleClearAll=()=>{
		setTitleValue([]);
		setParams((prev) => ({
			...prev,
			task_category_id: [],
		  }));
	}
    const handleRemoveItem=(itemToRemove: number)=>{
		setParams((prev) => ({
			...prev,
			task_category_id: prev.task_category_id.filter((item) => item !== itemToRemove), 
		  }));
		 const data= titleValue.filter((pre)=> pre.value !== itemToRemove )
		 setTitleValue(data)
	}
	return (
		<>
			<ResponsiveSideBar
				show={media}
			/>
			<Tabs
				value={params?.tab}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example"
				sx={{
					borderBottom: "1px solid #88344C",
				}}
			>
				{tabList?.map(({ label, value }) => {
					return (
						<Tab
							label={label}
							value={value}
							key={value}
							sx={{
								minWidth: "15%",
								color: '#000000',
								fontWeight:fontWeightMedium,
								// "&.Mui-selected": {
								// 	backgroundColor: "#88344C",
								// 	whiteSpace: "nowrap",
								// 	width: { xs: "40%", sm: "30%", md: "15%" },
								// 	color: "#FFFFFF",
								// 	borderRadius: "8px 8px 0px 0px",
								// },
							}}
						/>
					);
				})}
			</Tabs>

			<SearchFilter
				params={params}
				setParams={setParams}
				handleData={handleData} 
			/>
			{
				params?.task_category_id.length > 0 && (
                <TypeFilterView 
				value={titleValue} 
				handleClearAll={handleClearAll} handleRemoveItem={handleRemoveItem}  />
				)
			}
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				gap: "20px"
			}}>
				{
					isLoading ? <ProgressBar /> : tabList?.map(({ value, component }) => {
						return params?.tab === value ? component : "";
					})
				}
			</Box>

		</>
	);
};

export default TabPanels;
