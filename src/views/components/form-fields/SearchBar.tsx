import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import { IconButton, InputAdornment } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
export default function SearchBar({ params, setParams }: ParamsType) {
	
	const [searchValue, setSearchValue] = useState("");
	const handleDebounceFn = (search: string) => {
		setParams((state) => ({
			...state,
			search,
			page: 0
		}));
	}

	const handleChange = (search: string) => {
		setSearchValue(search);
		debounceFn(search)

	};
	const handleClose = () => {
		setSearchValue("");
		setParams((state) => ({
			...state,
			search: "",
		}));
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceFn = useCallback(_debounce(handleDebounceFn, 300), []);

	useEffect(() => {
		setSearchValue("");
	}, [params.tab])

	return (
		<>
			<TextField
				size="small"
				placeholder="Search"
				fullWidth
				onChange={(e) => handleChange(e?.target?.value || "")}
				value={searchValue}
				InputProps={{
					endAdornment: searchValue && (
						<InputAdornment position="end">
							<IconButton sx={{ padding: '1px', background: 'none', color: 'black' }}
								onClick={handleClose}
							>
								<CloseIcon sx={{ width: 18, height: 18 }} />
							</IconButton>

						</InputAdornment>
					),
				}}

			/>
		</>
	);
}
