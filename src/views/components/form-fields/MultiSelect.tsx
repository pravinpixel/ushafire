import { Box, Button, FormHelperText, FormLabel, Menu, MenuItem, MenuList, Select, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { DownArrowTask } from "../../../utils/theme/svg";

// const CustomSelectIcon = styled("div")({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: 13,
//     height: 6,
//     background: `url(${selectArrow})`,
//     backgroundSize: "contain",
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center",
//     position: "relative",
//     transform: "translateX(-12px) translateY(6px)",
// });

const renderValue = (label: string, value?: string[]) => {
    return !value || value?.length <= 0 ? {
        renderValue: () => <Typography
            sx={{
                color: '#050505',
                opacity: '50%',
                padding: "0px"
            }}
            variant="f16"
            fontWeight={400}
        >
            {`Select ${label}`}
        </Typography>
    } : {}
}

const MultiSelectField = (props: {
    label: string;
    name: string;
    options?: EssentailTypeListResponse[];
    disabledArray?: string[]
}) => {
    const { label, name, options = [], disabledArray = [] } = props;
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({
        control,
        name,
        defaultValue: "",
    });
    const dropDowns = options || [];

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClear = () => {
        field.onChange('');

    };
    const errorMessage = error?.message;

    const getWidth = () => {
        return document.getElementById('basic-button')?.clientWidth || 860
    }

    const value = typeof field?.value === 'string' ? field.value.split(',') : field?.value || []

    return (
        <>
            <Box sx={{
                '& .MuiSelect-select': {
                    padding: "5px 14px !important"
                }
            }}>
                <FormLabel>{label}</FormLabel>


                <Select
                    readOnly
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => handleClick(e)}
                    multiple={true}
                    size="small"
                    sx={{
                        mt: 1, width: "100%", "& .MuiSvgIcon-root": {
                            width: '19px',
                            height: '19px',
                            right: '11px',
                            top: 'calc(50% - 0.35em)',
                        }
                    }}
                    {...field}
                    value={value}
                    variant="outlined"
                    error={!!errorMessage}
                    displayEmpty
                    IconComponent={DownArrowTask}
                    {...renderValue(label, field?.value)}
                >
                    {dropDowns?.map((d) => (
                        <MenuItem
                            disabled={disabledArray?.includes(String(d?.id))}
                            value={String(d?.id)}
                            key={d?.id}
                        >
                            {d?.name}
                        </MenuItem>
                    ))}
                </Select>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuList sx={{
                        maxHeight: "150px",
                        overflow: "auto",
                        borderBottom: '1px solid lightgray',
                        width: getWidth() ? `${getWidth() - 30}px` : '',
                    }}>
                        {dropDowns?.map((d) => (
                            <MenuItem
                                disabled={disabledArray?.includes(String(d?.id))}
                                value={String(d?.id)}
                                key={String(d?.id)}
                                onClick={() => {
                                    let array: string[] = typeof field?.value === 'string' ? field?.value?.split(',') : field?.value || []
                                    const condition = array?.includes(String(d?.id))
                                    if (condition) {
                                        array = array?.filter((arr: string) => String(arr) !== String(d.id))
                                    } else {
                                        array.push(String(d?.id))
                                    }
                                    field.onChange(array.join(','))
                                }}
                                sx={{
                                    background: ({ palette }) => field?.value?.includes(d.id) ? palette?.primary?.light : ""
                                }}
                            >
                                {d?.name}
                            </MenuItem>
                        ))}
                    </MenuList>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        paddingTop: "18px",
                        gap: '15px'
                    }}>

                        <Button sx={{
                            width: 120,
                            padding: 1,
                        }} size="small" onClick={handleClose}>Close</Button>
                        <Button sx={{
                            width: 120,
                            padding: 1,
                        }} size="small" onClick={handleClear}>Clear All</Button>
                    </Box>

                </Menu>

                {errorMessage && <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>}
            </Box>
        </>
    );
};

export default MultiSelectField;
