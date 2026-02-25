import { ChangeEvent, forwardRef, HTMLProps, KeyboardEvent } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  handleChange: (value: string, name: string) => void;
}

const InputPicker = forwardRef<HTMLInputElement, InputProps>(
  ({ style, handleChange, ...props }, ref) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { value, name } = e.target;
      handleChange(value, name);
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !props.value) {
        handleChange("", props.name);
      }
    };
    return (
      <input
        value={props.value}
        onChange={onChange}
        type="number"
        onKeyDown={handleKeyDown}
        ref={ref}
        // className={styles.input}
        className="border-none outline-none flex-1 min-w-0 text-center border-white border border-collapse rounded-none m-0"
        style={style}
        {...props}
      />
    );
  },
);

export default InputPicker;
