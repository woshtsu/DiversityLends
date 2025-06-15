
type InputProps = {
  id: string,
  type: string,
  placeholder?: string,
  value: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  required: boolean
}


export const Input: React.FC<InputProps> = ({ id, type = "text", placeholder, value, onChange, required = false }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}