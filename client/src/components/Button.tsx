type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

function Button({children, onClick, type = "button"}: ButtonProps)
{
  return (
    <button
      className="button"
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
}

export default Button;