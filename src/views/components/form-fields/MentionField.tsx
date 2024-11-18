
import { CircularProgress } from '@mui/material';
import { FormHelperText, IconButton } from '@mui/material';
import { FormLabel } from '@mui/material';
import Mentions from 'rc-mentions';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { SendIcons } from '../../../utils/theme/svg';

const MentionField = ({ options,name,label,placeholder,row ,mt,loading}: { options: EssentailTypeListResponse[] | undefined,name:string,label?:string,placeholder:string,row:number ,mt?:any,loading?:boolean}) => {
    const { control } = useFormContext();
	const { field, fieldState: { error } } = useController({
		name: name,
		defaultValue: "",
		control,
	});
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    console.log(selectedOptions,"selectedOptions")
    // const onSelect = (option: any) => {
    //     if (!selectedOptions.includes(option.value)) {
    //       setSelectedOptions((prevSelected) => [...prevSelected, option.value]);
    //       field.onChange(option.value);
    //     }
    //   };
    const onSelect = (option: any, prefix: string) => {
      if (!selectedOptions.includes(option.value)) {
          setSelectedOptions((prevSelected) => [...prevSelected, option.value]);
          const currentValue = field.value || '';
          const lastIndex = currentValue.lastIndexOf(prefix);
          
          if (lastIndex !== -1) {
              const newValue = currentValue.slice(0, lastIndex) + `${prefix}${option.value} ` + currentValue.slice(lastIndex + prefix.length);
              field.onChange(newValue);
          } else {
              field.onChange(currentValue + `${prefix}${option.value} `);
          }
      }
  };

      
      
      const onChange = (value: string) => {
        field.onChange(value);
        console.log('onChange:', value); 
      };
      // const handleRemove = (value: string) => {
      //   setSelectedOptions((prevSelected) => prevSelected.filter((item) => item !== value));
      //   console.log('Removed:', value);
      // };
      const mappedOptions = Array.isArray(options) ? options.map((item: any) => ({
        value: item.name,
        label: item.name, 
      })) : [];
      const errorMessage = error?.message;
  return (
    <>
    {label && (
  <FormLabel>{label}</FormLabel>
    )}
    <div style={{ position: 'relative', width: '100%' }}>
    <Mentions
    {...field}
    autoFocus
    rows={row}
    defaultValue=""
    onSelect={onSelect}
    onChange={onChange}
    options={mappedOptions}
    split='@'
    placeholder={placeholder}
    style={{
      marginTop: mt ? '0px': '8px',
      width:'100%',
      paddingRight : mt ? '40px' : '0px',
      fontSize:mt? '14px':'16px'
    }}
  />
  {
    mt && (
      <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)'}}>
      {loading ? (
        <IconButton sx={{ background: "none" }}>
          <CircularProgress
            size={20}
            sx={{
              color: "primary.main",
            }}
          />
        </IconButton>
      ) : (
        <IconButton
         type='submit'
          sx={{
            background: "none",
            "&:hover": {
              background: "#f2dde3 !important",
            },
          }}
        >
          <SendIcons sx={{ width: 20, height: 20 }} />
        </IconButton>
      )}
    </div>
    )
  }
    
    </div>
  
    
   
    {errorMessage && <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>}
  </>
  )
}

export default MentionField