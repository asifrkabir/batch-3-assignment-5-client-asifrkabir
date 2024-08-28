import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";

type AppUploadProps = {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxCount?: number;
  style?: React.CSSProperties;
};

const AppUpload: React.FC<AppUploadProps> = ({
  name,
  label,
  required = false,
  disabled = false,
  multiple = true,
  accept,
  maxCount,
  style = {},
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
          <Upload
            {...field}
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            beforeUpload={() => false} // Prevents automatic upload
            maxCount={maxCount}
            fileList={field.value} // Keeps the uploaded files in sync
            onChange={({ fileList }) => field.onChange(fileList)} // Updates the form state
          >
            <Button
              style={{ width: "100%" }}
              icon={<UploadOutlined />}
              disabled={disabled}>
              Click to Upload
            </Button>
          </Upload>
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

export default AppUpload;
