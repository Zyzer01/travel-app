// eslint-disable-next-line react/prop-types
export const FilledButton = ({ text, width, onClick }) => {
    return (
      <button onClick={onClick} className={`w-${width} text-white bg-primary hover:bg-white transition hover:text-primary border text-primary border-primary p-2 rounded`}>
        {text}
      </button>
    );
  };