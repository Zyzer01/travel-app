// eslint-disable-next-line react/prop-types
const CheckboxWithLabel = ({ label, value, id, onChange, checked }) => {
  return (
    <div className="flex items-center space-x-3 mb-3">
      <input
        onChange={onChange}
        id={id}
        value={value}
        checked={checked}
        type="checkbox"
        className="relative peer shrink-0 appearance-none w-4 h-4 border-2 border-red-500 rounded-sm bg-white checked:bg-primary checked:border-0"
      />
      <p>{label}</p>
    </div>
  );
};

export default CheckboxWithLabel;
