// eslint-disable-next-line react/prop-types
export const OutlineButton = ({ text, width, onClick }) => {
    return (
      <button onClick={onClick} className={`w-${width} border transition hover:bg-primary hover:text-white text-primary border-primary p-2 rounded`}>
        {text}
      </button>
    );
  };