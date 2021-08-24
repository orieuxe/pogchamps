import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function DatePicker(props: ReactDatePickerProps) {
  const {
  isClearable = false,
  showPopperArrow = false,
  ...rest
} = props

  // const isLight = useColorMode().colorMode==='light';

  return (
    // <div className={isLight?"light-theme":"dark-theme"}>
    <div className={"light-theme-original"}>
      <ReactDatePicker
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
        className="react-datapicker__input-text"
        {...rest}
      />
    </div>
  );
};

export {DatePicker}