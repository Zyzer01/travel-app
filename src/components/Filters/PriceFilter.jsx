import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FilledButton } from '../ui/FilledButton';

// eslint-disable-next-line react/prop-types
const PriceFilter = ({ sortByPrice }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleFindClick = () => {
    const x = priceRange[0];
    const y = priceRange[1];
    sortByPrice(x, y);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="flex flex-col gap-3">
        <p>from: ${priceRange[0]}</p>
        <Slider
          range
          min={0}
          max={3000}
          defaultValue={[0, 1000]}
          railStyle={{ backgroundColor: '#ccc' }}
          trackStyle={{ backgroundColor: '#f75320' }}
          handleStyle={{
            borderColor: '#f75320',
            backgroundColor: '#f75320',
          }}
          onChange={handleSliderChange}
        />
        <p>to: ${priceRange[1]}</p>
        <FilledButton text="Find" onClick={handleFindClick}/>
      </div>
  );
};

export default PriceFilter;
