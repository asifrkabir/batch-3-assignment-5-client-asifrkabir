import { Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller, useFormContext } from "react-hook-form";

type AppTextAreaProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties; // Allows custom styling
  rows?: number; // Number of rows for the textarea
  size?: SizeType;
};

const AppTextArea: React.FC<AppTextAreaProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  style = {}, // Default to an empty object
  rows = 4, // Default number of rows
  size = "middle",
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
          <Input.TextArea
            {...field}
            size={size}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
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

export default AppTextArea;
