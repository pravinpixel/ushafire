import { Box, Checkbox, ClickAwayListener,  Grid, Grow, MenuList, Paper, Popper, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { typeDownArrow, typeFilter } from "../../../utils/helpers/assetHelper";
import { fontWeightBold, fontWeightMedium, fontWeightRegular } from "../../../utils/theme/typography";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useEssentailApi } from "../../../store/hooks/essentailHooks";


interface MenuItemData {
	title: string;
	children?: MenuItemChildData[];
	multiple: boolean;
	name: keyof TaskPagination;
}

interface MenuItemChildData {
	title: string;
	value: string;
}

// const menuItems: MenuItemData[] = [
// 	{
// 		title: "Sort by",
// 		multiple: true,
// 		name: "sort_by",
// 		children: [
// 			{ title: "Payments", value: "payments" },
// 			{ title: "Accounts & Finance", value: "accounts & finance" },
// 			{ title: "Accounts", value: "accounts" },
// 			{ title: "HR Team", value: "hr team" },
//             { title: "After Sales Service", value: "after sales service" },
// 		],
// 	},
// ];



export default function TypeFilter({ params, setParams,handleData }: ParamsType) {
	const label = { inputProps: { "aria-label": "Checkbox demo" } };
	const theme = useTheme();
	const { data } = useEssentailApi({
		keys: ["task-category"],
	});

	const isXs = useMediaQuery(theme.breakpoints.down("md"));
	const [open, setOpen] = React.useState(false);
	
	const anchorRef = React.useRef<HTMLButtonElement>(null);
	
	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};
	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};
	const handleFilter = (name: keyof TaskPagination, value?: string, multiple?: boolean, dataValue?:any) => {
		if (multiple) {
			setParams((prevState) => {
				let valuearr: string[] = prevState?.[name] as never || [];
				const newarr = (valuearr).includes(value || '');
				// setTitleValue(dataValue)
				handleData(dataValue)
				if (newarr) {
					valuearr = valuearr.filter((item) => item !== value);
				} else {
					valuearr.push(value || '');
				}
				return {
					...prevState,
					[name]: valuearr,
				};
			});

		} else {
			setParams((prevState) => {
				return {
					...prevState,
					[name]: value,
				};
			});
		}
	};

	const handlemultipleArr = (name: keyof TaskPagination, value?: string, multiple?: boolean) => {
		if (multiple) {
			return (params?.[name] as string[])?.includes(value || '');
		} else {
			return params?.[name] === value;
		}
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const menuItems: MenuItemData[] = [
		{
		  title: "Sort by",
		  multiple: true,
		  name: "task_category_id",
		  children: data?.data?.['task-category']?.map((category) => ({
			title: category.name,
			value: category.id, 
		  })) || [],
		},
	  ];
	return (
		<>
			<Box
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? 'composition-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				sx={{
					pl: 2.5,
					pr:1.4
				}}
			>
				<Stack
					display="flex"
                    flexDirection={'row'}
					justifyContent={"center"}
					alignItems={"center"}
                    gap={'10px'}
					sx={{
						width: "100%",
						height: "45px",
						border: "1px solid #a2415c",
						borderRadius: "7px",
						cursor: 'pointer'
					}}
				>
                    <img src={typeFilter} alt="type-filter" width='20' height='20'/>
                    <Typography variant="f16" fontWeight={fontWeightRegular} color={'rgba(136, 52, 76, 1)'}>Type</Typography>
					<img
						src={typeDownArrow}
						alt="Vector"
						width="20"
						height="20"
					/>
				</Stack>
			</Box>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-start"
				transition
				disablePortal
				sx={{
					zIndex: 10, "& .MuiPaper-root": {
						width: isXs ? '175px' : '178px',
						maxHeight:isXs ? '100px' : '195px',
						minHeight: '170px',
						overflowY : 'auto',
                        overflowX: 'hidden',
						padding: '5px 0px 5px 15px',
						boxShadow: 'rgba(158, 158, 158, 0.2) 0px 5px 5px -3px, rgba(158, 158, 158, 0.14) 0px 8px 10px 1px, rgba(158, 158, 158, 0.12) 0px 3px 14px 2px;',
						borderRadius: '6px'
					}
				}}
			>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps}
						style={{
							transformOrigin: 'top'
							// placement === 'bottom-start' ? 'left top' : 'left bottom',
						}}>
						<Paper >
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>
									<Grid container>
										{menuItems.map((menu, index) => 
										(
											
											<Grid
												item
												xs={12}
												md={12}
												key={index}

											>
												<Box>
													<Typography
														variant="f14"
														color="rgba(136, 52, 76, 1)"
														sx={{ fontWeight: fontWeightBold }}
													>
														{menu.title}
													</Typography>
												
                                                   
                                                   
														
															{menu.children?.map((dataValue, childIndex) => (
																<Stack
																	// width={xs:'28px'}
																	// height={xs:'28px'}
																	direction="row"
																	key={childIndex}
																	sx={{
																		'svg': {
																			height: "12px",
																			width: "12px"
																		},
																		// marginTop: "3px",
																		// width: "20px",
																		minHeight: "20px",
																		marginTop: { xs: '-14px', sm: '-1px' },
																	}}

																>
																	<Checkbox
																		checked={handlemultipleArr(
																			menu.name,
																			dataValue.value,
																			menu.multiple
																		)}
																		{...label}
																		onChange={() =>
																			handleFilter(
																				menu.name,
																				dataValue?.value,
																				menu.multiple,
                                                                                dataValue

																			)
																		}

																	/>
																	<MenuItem
																		onClick={() => handleFilter(menu.name, dataValue.value, menu.multiple, dataValue)}
																		sx={{
																			fontSize: ({ typography }) =>
																				typography.fontSizeList.f12,
																			fontWeight: fontWeightMedium,
																			paddingTop: '0px',
																			marginLeft: '-6.8px',
																			// "& .MuiMenuItem": {
																			// 	paddingLeft: "2px",
																			// },
																			
																			'&:hover': {
																				backgroundColor: 'transparent',
																			},
																			whiteSpace:'normal',
                                                                            wordBreak:'break-all'
																		}}
																	>
																		{dataValue.title}
																	</MenuItem>
																</Stack>
															))}

												</Box>

											</Grid>
										))}
									</Grid>
                                    {/* <Box display={'flex'} justifyContent={"center"}
										alignItems={"center"} my={1}>
										<CustomButton
											type="submit"
											sx={{ padding: '3px' }}
											onClick={handleClose}
											label="Cancel"
										/>
									</Box> */}
								</MenuList>

							</ClickAwayListener>
						</Paper>

					</Grow>
				)}
			</Popper>
		</>
	);
}