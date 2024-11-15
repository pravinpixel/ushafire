
import Mentions from 'rc-mentions';
import { useState } from 'react';

const MentionField = ({ options }: { options: any[] }) => {
    // const {options}=props;
    // const onSelect = (option:any) => {
    //     console.log('Select:',  option.value);
    //     setSelectedOptions((prevSelected) => [...prevSelected, option.value]);
    //   };
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    console.log(selectedOptions,"selectedOptions")
    const onSelect = (option: any) => {
        if (!selectedOptions.includes(option.value)) {
          setSelectedOptions((prevSelected) => [...prevSelected, option.value]);
        }
      };
      
      
      const onChange = (value: string) => {
        console.log('onChange:', value); 
      };
      const handleRemove = (value: string) => {
        setSelectedOptions((prevSelected) => prevSelected.filter((item) => item !== value));
        console.log('Removed:', value);
      };
      const mappedOptions = Array.isArray(options) ? options.map((item: any) => ({
        value: item.name,
        label: item.name, 
      })) : [];
  return (
    <>
    <Mentions
    autoFocus
    rows={3}
    defaultValue=""
    onSelect={onSelect}
    onChange={onChange}
    options={mappedOptions}
    split='@'

  />
  </>
  )
}

export default MentionField