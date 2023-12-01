import CheckboxWithLabel from '../ui/CheckboxWithLabel';

// eslint-disable-next-line react/prop-types
const AirlineFilter = ({ allFlights, flight, setFlight }) => {
  const handleCheckboxChange = (value) => {
    setFlight([value]); // Set the current checkbox as the only checked one
  };

  return (
    <div>
      {allFlights.map((item, key) => (
        <div key={key} className="flex items-center">
          <CheckboxWithLabel
            value={item}
            id={item + 'flight'}
            checked={flight[0] === item}
            onChange={() => handleCheckboxChange(item)}
          />
          <label className='mb-3' htmlFor={item + 'flight'}>{item}</label>
        </div>
      ))}
    </div>
  );
};

export default AirlineFilter;
