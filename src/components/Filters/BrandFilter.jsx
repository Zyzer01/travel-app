import CheckboxWithLabel from '../ui/CheckboxWithLabel';

const BrandFilter = ({ allBrands, brand, setBrand }) => {
  const handleCheckboxChange = (value) => {
    setBrand([value]); // Set the current checkbox as the only checked one
  };

  return (
    <div className="flex flex-col">
      {allBrands.map((item, key) => (
        <div key={key} className="flex gap-3">
          <CheckboxWithLabel
            value={item.id}
            checked={brand[0] === item.id}
            onChange={() => handleCheckboxChange(item.id)}
          />
          <label className='mb-3' htmlFor={item.name + 'dept'}>{item.name}</label>
        </div>
      ))}
    </div>
  );
};

export default BrandFilter;
