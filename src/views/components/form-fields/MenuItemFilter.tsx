import { Box, Checkbox, ClickAwayListener, FormControlLabel, Grid, Grow, MenuList, Paper, Popper, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { fontWeightBold, fontWeightMedium } from "../../../utils/theme/typography";
import CustomButton from "../Button";
import { InitialPagination } from "../../../utils/helpers/globalHelper";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { MenuFilters } from "../../../utils/theme/svg";


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

const menuItems: MenuItemData[] = [
	{
		title: "Sort by",
		multiple: false,
		name: "sort_column",
		children: [
			{ title: "A to Z", value: "a_to_z" },
			{ title: "Z to A", value: "z_to_a" },
			{ title: "Last update", value: "last_update" },
			{ title: "New task", value: "new_task" },
			{ title: "Marked as completed", value: "mark_as_completed" },
		],
	},
	{
		title: "Priority",
		multiple: true,
		name: "priority_id",
		children: [
			{ title: "High", value: "5" },
			{ title: "Medium", value: "7" },
			{ title: "Low", value: "6" },
		],
	},
	{
		title: "Due date",
		multiple: true,
		name: "deadline",
		children: [
			{ title: "Today", value: "today" },
			{ title: "Tomorrow", value: "tomorrow" },
			{ title: "Next week", value: "next_week" },
			{ title: "Overdue", value: "over_due" },
			{ title: "Due this week ", value: "this_week" },
		],
	},
];



export default function MenuItemFilter({ params, setParams }: ParamsType) {
	const label = { inputProps: { "aria-label": "Checkbox demo" } };
	const theme = useTheme();
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
	const handleFilter = (name: keyof TaskPagination, value?: string, multiple?: boolean) => {
		if (multiple) {
			setParams((prevState) => {
				let valuearr: string[] = prevState?.[name] as never || [];
				const newarr = (valuearr).includes(value || '');

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

	const handleClear = () => {
		setParams((state) => {
			return {
				...InitialPagination,
				search: state?.search || null,
				tab: state?.tab || 'my_task',
				priority_id: [],
				deadline: [],
				task_category_id: state?.task_category_id || [],
			}
		})
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
					px: 1,
				}}
			>
				<Stack
					display="flex"
					justifyContent={"center"}
					alignItems={"center"}
					sx={{
						width: "100%",
						height: "45px",
						border: "1px solid #a2415c",
						borderRadius: "7px",
						cursor: 'pointer'
					}}
				>
					{/* <img
						src={Vector}
						alt="Vector"
						width="16"
						height="18"
					/> */}
					<MenuFilters sx={{width:16,height:18}}/>
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
						width:isXs ? '252px' : '315px',
						maxHeight:isXs ? '100px' : 'auto',
						minHeight: '200px',
						overflow : isXs ? 'auto' : 'none',
						padding: '5px 0px 0px 18px',
						boxShadow: 'rgba(158, 158, 158, 0.2) 0px 5px 5px -3px, rgba(158, 158, 158, 0.14) 0px 8px 10px 1px, rgba(158, 158, 158, 0.12) 0px 3px 14px 2px;',
						borderRadius: '8px'
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
										{menuItems.map((menu, index) => (
											<Grid
												item
												xs={12}
												md={6}
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
													{menu.name === "sort_column" ? (
														<RadioGroup

															aria-label={menu.name}
															name={menu.name}
															value={params[menu?.name]}
															onChange={(event) => handleFilter(menu.name, event.target.value, menu.multiple)}
															sx={{
																'svg': {
																	height: "12px",
																	width: "12px"
																},
																"& .MuiFormControlLabel-root": {
																	marginTop: '-7.2px'
																},


															}}
														>
															{menu.children?.filter((child)=> !(params?.tab === "archived" && child.value === 'mark_as_completed')).map((dataValue, childIndex) => (
																<FormControlLabel
																	key={childIndex}
																	value={dataValue.value}
																	control={<Radio
																	/>}

																	label={dataValue.title}
																	sx={{
																		'& .MuiFormControlLabel-label': {
																			color: 'rgba(5, 5, 5, 1)',
																			fontSize: "12px",
																			fontWeight: 400,
																			marginTop: '-0.8px'
																		},

																	}}
																/>
															))}
														</RadioGroup>
													) : (
														<>
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
																		marginTop: "3px",
																		width: "20px",
																		height: "20px"
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
																				menu.multiple
																			)
																		}

																	/>
																	<MenuItem
																		onClick={() => handleFilter(menu.name, dataValue.value, menu.multiple)}
																		sx={{
																			fontSize: ({ typography }) =>
																				typography.fontSizeList.f12,
																			fontWeight: fontWeightMedium,
																			paddingTop: '0px',
																			marginLeft: '-6.8px',
																			// "& .MuiMenuItem": {
																			// 	paddingLeft: "2px",
																			// },
																			marginTop: { xs: '-14px', sm: '-1px' },
																			'&:hover': {
																				backgroundColor: 'transparent',
																			},
																		}}
																	>
																		{dataValue.title}
																	</MenuItem>
																</Stack>
															))}</>
													)}
												</Box>

											</Grid>
										))}
									</Grid>
									<Box display={'flex'} justifyContent={"center"}
										alignItems={"center"} my={1}>
										<CustomButton
											type="submit"
											sx={{ padding: '2px' }}
											// loading={isSubmitting}
											onClick={handleClear}
											label="Clear"
										/>
									</Box>

								</MenuList>

							</ClickAwayListener>
						</Paper>

					</Grow>
				)}
			</Popper>
		</>
	);
}
