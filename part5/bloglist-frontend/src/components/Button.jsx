const Button = ({ id, type, text, onClick, className }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      type={type}
      className='py-1 px-2 rounded-md text-sm text-white bg-gradient-to-br from-slate-400 to-slate-600
      hover:from-slate-500 hover:to-slate-700
      active:from-slate-600 active:to-slate-800'
    >
      {text}
    </button>
  );
};

export default Button;
