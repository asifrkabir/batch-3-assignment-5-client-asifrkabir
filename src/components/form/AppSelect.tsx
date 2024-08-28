import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

type AppSelectProps = {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }> | undefined;
  placeholder?: string;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  size?: SizeType;
};

const AppSelect: React.FC<AppSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  required = false,
  multiple = false,
  disabled = false,
  size = "middle",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </label>
          <Select
            {...field}
            size={size}
            showSearch
            mode={multiple ? "multiple" : undefined}
            placeholder={placeholder}
            disabled={disabled}
            style={{ width: "100%" }}
            onChange={(value) => field.onChange(value)}
            value={field.value}
            allowClear
            options={options}></Select>
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

export default AppSelect;
