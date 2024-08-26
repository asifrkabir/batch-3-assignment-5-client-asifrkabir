import { Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller, useFormContext } from "react-hook-form";

type AppInputProps = {
  name: string;
  label: string;
  type?: string; // e.g., 'text', 'password', 'number'
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: SizeType;
  style?: React.CSSProperties; // Allows custom styling
};

const AppInput: React.FC<AppInputProps> = ({
  name,
  label,
  type = "text", // Default type is 'text'
  placeholder,
  required = false,
  disabled = false,
  size = "middle",
  style = {}, // Default to empty object
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
          <Input
            {...field}
            placeholder={placeholder}
            size={size}
            disabled={disabled}
            type={type}
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

export default AppInput;
