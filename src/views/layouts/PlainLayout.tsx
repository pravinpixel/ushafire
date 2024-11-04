/**
 * This file is part of AutoPack.
 *
 * Its is used to auth layout for login
 *
 * Reset password ,forgot password
 */
import { Box, Grid, Paper, Typography } from "@mui/material";
// import { loginImage } from "../../utils/helpers/assetHelper";
import { loginSide,task_logo} from "../../utils/helpers/assetHelper";
import { fontWeightMedium, fontWeightRegular} from "../../utils/theme/typography";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { TaskMasterLogoIcons } from "../../utils/theme/svg";
// ----------------------------------------------------------------------

export default function PlainLayout({ children }: { children: React.ReactNode }) {
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Grid
			container
			component="main"
			sx={{ height: "100vh", overflowX:{xs:'auto',md:'none'}, background: ({ palette }) => palette.primary.main , '&::-webkit-scrollbar': {
				display: 'none', 
			  },
			  '-ms-overflow-style': 'none',  
			  'scrollbar-width': 'none', 
			'& .MuiPaper-root':{
				'@media (max-width: 899px)': {
					paddingX:'24px'
				  }
			}  }}
		>
			<Grid
				item
				xs={12}
				sm={12}
				md={5.5}
				sx={{
					backgroundImage: {
						xs: `none`,
						md: `url(${loginSide})`,
					},
					backgroundRepeat: "no-repeat",
					backgroundColor: {
						xs: "#88344C",
						md: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
					},
					backgroundSize: { md: "cover"},
					backgroundPosition: {
						xs: "center",
						md: "45%",
					},
					minHeight: {
						xs: "34%",
						sm:"50%",
						md: "auto",
					},
					display:'flex',
					justifyContent:'center',
					alignItems:'center',
					flexDirection:'column',
                    position:'relative'
				}}
				
			>
				<Box  sx={{display:{xs:'block',md:'block'}}}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    {/* <img src={task_logo} alt="logo" width={isXs? '35px':75} height={isXs? '49px':75} /> */}
					<TaskMasterLogoIcons sx={{width:isXs? '35px':95,height:isXs? '49px':130}}/>
					</Box>
					<Typography mt={{xs:0,md:-2}}  display={'flex'}  alignItems={'center'}  sx={{fontWeight:fontWeightMedium,color:'rgba(255, 255, 255, 1)',fontSize:{xs:'22px',md:'59px'}}}>Task Master</Typography>
					
				</Box>
				<Box  sx={{display:{xs:'none',md:'block',position:'absolute',bottom:"9%"}}} alignItems={'center'} justifyContent={'center'}>
					{/* <img src={ushaFire} alt="logo" style={{maxWidth:'115px',minHeight:'45px'}} /> */}
					<Typography variant="f16"  sx={{fontWeight:fontWeightRegular,color:'rgba(255, 255, 255, 1)',}}>Powered by USHA FIRE</Typography>
				</Box>
				</Grid>
			<Grid
				item
				xs={12}
				sm={12}
				md={6.5}
				component={Paper}
				elevation={6}
				square
				sx={{
					//   ...paper({ theme: theme, bgcolor: theme.palette.grey[200] }),
					display: "flex",
					width: "100%",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: { xs: "50px 50px 0px 0px", md: "0px" },
				}}
			>
				{children}
			</Grid>
		</Grid>
	);
}
