import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function SelectComp({
  data,
  onChange,
  onFocus,
  onBlur,
  onSearch,
}) {
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder='Select a Quiz'
      optionFilterProp='children'
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {data?.map((ele) => (
        <Option value={ele._id}>{ele.title}</Option>
      ))}
    </Select>
  );
}
