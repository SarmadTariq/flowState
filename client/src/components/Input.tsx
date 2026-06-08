type InputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

function Input({type = "text", placeholder, value, onChange}: InputProps)
{
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) =>onChange(event.target.value)}
    />
  );
}

export default Input;