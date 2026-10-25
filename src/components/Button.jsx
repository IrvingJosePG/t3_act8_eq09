export default function Button({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  disabled 
}) {
  const baseStyles = "w-full py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-blue-700 text-lg text-white hover:bg-blue-800 shadow-lg shadow-blue-700/30 disabled:opacity-70",
    secondary: "bg-white text-lg border border-gray-200 text-gray-700 hover:bg-gray-50 mt-6"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}