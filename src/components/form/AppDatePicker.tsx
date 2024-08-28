import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

type AppDatePickerProps = {
  name: string;
  label: string;
  placeholder?: string;
  showTime?: boolean;
  required?: boolean;
  disabled?: boolean;
  size?: SizeType;
  style?: React.CSSProperties; // Allows custom styling
  picker?: "date" | "week" | "month" | "quarter" | "year";
};

const AppDatePicker: React.FC<AppDatePickerProps> = ({
  name,
  label,
  placeholder,
  showTime = false,
  required = false,
  disabled = false,
  size = "middle",
  style = {},
  picker = "date",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div style={{ ...style }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </label>
          <DatePicker
            {...field}
            size={size}
            placeholder={placeholder}
            showTime={showTime}
            disabled={disabled}
            style={{ width: "100%" }}
            onChange={(date) => field.onChange(date)}
            value={field.value}
            picker={picker}
          />
          {error && (
            <span style={{ color: "red", display: "block", marginTop: "4px" }}>
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default AppDatePicker;
