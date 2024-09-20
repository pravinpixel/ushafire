import { Autocomplete, Box, Button, FormLabel, MenuItem, TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { DownArrowTask } from "../../../utils/theme/svg";
import { useState } from "react";

const MultiAutoCompleteField = (props: {
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
        defaultValue: '',
    });
    const dropDowns = options || [];
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenCloseToggle = () => {
        setOpen(prev => !prev);
    };
    const errorMessage = error?.message;
    const handleSelectionChange = (_: unknown, newValue: EssentailTypeListResponse[]) => {
        const selectedIds = newValue.map(option => option.id).join(",");
        field.onChange(selectedIds);
    };

    const value = typeof field.value === 'string' ? field.value.split(',') : field.value || [];

    return (
        <>
            <Box sx={{
                '& .MuiSelect-select': {
                    padding: "7px 14px !important"
                },
                '& .MuiIconButton-root': {
                    background: 'none !important',
                    color: 'rgba(5, 5, 5, 1)'
                },
            }}>
                <FormLabel>{label}</FormLabel>
                <Autocomplete
                    disableCloseOnSelect
                    multiple
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    value={dropDowns.filter(option => value.includes(String(option.id)))}
                    onChange={handleSelectionChange}
                    // onBlur={field.onBlur}
                    options={dropDowns}
                    getOptionLabel={(option) => option.name || ""}
                    getOptionDisabled={(option) => disabledArray.includes(String(option.id))}
                    renderTags={(selected) =>
                        selected.map((option, index) => (

                            <span key={option.id} >
                                <Box sx={{ paddingLeft: '8px', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                    {index > 0 && ", "}
                                    {option.name}
                                </Box>
                            </span>

                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!errorMessage}
                            helperText={errorMessage}
                            variant="outlined"
                            size="small"
                            placeholder="Enter task followers name"

                        />
                    )}
                    renderOption={(props, option) => (
                        <>
                            <MenuItem  {...props} component="li"

                            >
                                {option.name}
                            </MenuItem>
                            {option.id === dropDowns[dropDowns.length - 1].id && (
                                <Box sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 7, backgroundColor: 'white', position: 'fixed',
                                    bottom: 0, width: '100%'
                                }}>
                                    <Button sx={{
                                        width: 120,
                                        padding: 1,
                                        marginY: { xs: 2, sm: 1 },

                                    }} size="small" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                    // ListboxComponent={(listboxProps) => (
                    //     <>
                    //     {
                    //         console.log(listboxProps,"listbox")
                    //     }
                    //      <Box>



                    //        <ul {...listboxProps} 

                    //        />
                    //        <ListSubheader
                    //            sx={{
                    //                display: 'flex',
                    //                alignItems: 'center',
                    //                justifyContent: 'center',
                    //                borderTop: '1px solid #ddd',
                    //                paddingTop: "18px",
                    //            }}
                    //        >
                    //            <Button sx={{
                    //            width: 120,
                    //            padding: 1,
                    //        }} size="small" onClick={handleClose}>
                    //                Close
                    //            </Button>
                    //        </ListSubheader>
                    //    </Box>
                    //     </>

                    // )}
                    size="small"
                    sx={{
                        width: '100%', mt: 1, "& .MuiAutocomplete-root": {
                            paddingLeft: '10px'
                        }
                    }}
                    popupIcon={
                        // <DownArrowTask sx={{width:19,margin:0.2}}  onClick={handleOpenCloseToggle}/>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center' }}
                            onClick={handleOpenCloseToggle}
                        >
                            <DownArrowTask sx={{ width: 20, margin: 0.2 }} />
                        </Box>
                    }

                />

            </Box>
        </>
    );
};

export default MultiAutoCompleteField;
