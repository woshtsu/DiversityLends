
type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined,
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({ type = "submit", children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
    >
      {children}
    </button>
  );
}