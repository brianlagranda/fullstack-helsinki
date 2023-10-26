const Button = ({ id, type, text, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      type={type}
      className='py-1 px-2 rounded-md text-sm text-white bg-gradient-to-br from-emerald-400 to-emerald-600
      hover:from-emerald-500 hover:to-emerald-700
      active:from-emerald-600 active:to-emerald-800'
    >
      {text}
    </button>
  );
};

export default Button;
