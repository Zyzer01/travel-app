import { useState, useEffect, useRef } from "react";
import "../App.css";
import { OutlineButton } from "./ui/OutlineButton";
import X from "../data.json";
import AirlineFilter from "./Filters/AirlineFilter";
import BrandFilter from "./Filters/BrandFilter";
import StopsFilter from "./Filters/StopsFilter";
import PriceFilter from "./Filters/PriceFilter";
import { GetPriceSort } from "./UtilityFunctions";
import { FilledButton } from "./ui/FilledButton";
import FlightCard from "./FlightCard";
import FlightDetails from "./FlightDetails";

const Flights = () => {
  const From =
    X.CatalogProductOfferingsResponse.CatalogProductOfferings
      .CatalogProductOffering[0].Departure;
  const arrival =
    X.CatalogProductOfferingsResponse.CatalogProductOfferings
      .CatalogProductOffering[0].Arrival;
  const alldata = X.CatalogProductOfferingsResponse;

  const [mid, setMid] = useState([]);
  const [midDup, setMidDup] = useState([]);
  const [finalarray, setFinalArray] = useState([]);
  const [temp, setTemp] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [finalArrayDup, setFinalArrayDup] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
  const [brand, setBrand] = useState([]);
  const [flight, setFlight] = useState([]);
  const [flightNo, setFlightNo] = useState([]);
  const [toggle, setToggle] = useState(false);

  const myRef = useRef(0);
  const myRef2 = useRef(0);

  useEffect(() => {
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
      if (
        (From === item.Departure && arrival === item.Arrival) ||
        (From === item.Arrival && arrival === item.Departure)
      ) {
        setMid((prev) => [...prev, item]);
      }
    });

    const uniqueBrands = alldata.ReferenceList[3].Brand.reduce((acc, item) => {
      if (
        item.name &&
        !acc.some((brand) => brand.id === item.id && brand.name === item.name)
      ) {
        acc.push({ name: item.name, id: item.id });
      }
      return acc;
    }, []);
    setAllBrands(uniqueBrands);

    const uniqueFlights = alldata.ReferenceList[0].Flight.reduce(
      (acc, item) => {
        if (item.carrier && !acc.includes(item.carrier)) {
          acc.push(item.carrier);
        }
        return acc;
      },
      []
    );
    setAllFlights(uniqueFlights);
  }, []);

  const processItem = (item, setFinalArrayFunc, setDisplayArrayFunc) => {
    let ffr, lfr;
    item.ProductBrandOptions.forEach((f) => {
      ffr = alldata.ReferenceList[0].Flight.find(
        (it) => it.id === f.flightRefs[0]
      );
      lfr = alldata.ReferenceList[0].Flight.find(
        (it) => it.id === f.flightRefs[f.flightRefs.length - 1]
      );
      f.DepartureTime = ffr.Departure.date;
      f.ArrivalTime = lfr.Arrival.date;

      const alp = f.ProductBrandOffering.map((it) => {
        const g = { ...f };
        g.ProductBrandOffering = [it];
        return g;
      });
      setFinalArrayFunc((prev) => [...prev, ...alp]);
      setDisplayArrayFunc((prev) => [...prev, ...alp]);
    });
  };

  useEffect(() => {
    mid.forEach((item) => processItem(item, setFinalArray, setDisplayArray));
  }, [mid]);

  useEffect(() => {
    midDup.forEach((item) => processItem(item, setFinalArrayDup, () => {}));
  }, [midDup]);

  useEffect(() => {
    const filteredArr = displayArray.filter((item) => {
      if (brand.length !== 0) {
        if (brand.includes(item.ProductBrandOffering[0].Brand?.BrandRef)) {
          if (flightNo.length > 0) {
            const x = Math.min(item.flightRefs.length, 3);
            return flightNo.includes(x);
          } else {
            return true;
          }
        }
      } else if (brand.length === 0) {
        if (flightNo.length !== 0) {
          const x = Math.min(item.flightRefs.length, 3);
          return flightNo.includes(x);
        } else {
          return true;
        }
      }
      return false;
    });

    let updatedArr = filteredArr;

    if (flight.length) {
      updatedArr = filteredArr.filter((item) => {
        for (let i = 0; i < item.flightRefs.length; i++) {
          const carrier = alldata.ReferenceList[0].Flight.find(
            (flight) => item.flightRefs[i] === flight.id
          )?.carrier;
          if (flight.includes(carrier)) {
            return true;
          }
        }
        return false;
      });
    }

    if (myRef.current.value !== "" && myRef2.current.value !== "") {
      updatedArr = updatedArr.filter((item) => {
        const alpha = item.ProductBrandOffering.filter(
          (y) =>
            y.BestCombinablePrice.TotalPrice >= myRef.current.value &&
            y.BestCombinablePrice.TotalPrice <= myRef2.current.value
        );
        const beta = { ...item };
        beta.ProductBrandOffering = alpha;
        return alpha.length !== 0;
      });
    }

    // Use 'updatedArr' instead of 'filteredArr' in the subsequent code

    window.tog = toggle;
    setFinalArray(filteredArr);
  }, [brand, flightNo, flight, toggle]);

  const sortPriceAsc = () => {
    setTemp(finalarray.sort(GetPriceSort()));
  };

  const sortByPrice = () => {
    setToggle(!toggle);
  };

  const clearFilter = () => {
    setFinalArray(displayArray);
    setBrand([]);
    setFlightNo([]);
    setFlight([]);
    myRef.current.value = "";
    myRef2.current.value = "";
  };

  const [flag, setflag] = useState(0);

  useEffect(() => {
    if (finalarray.length !== 0) {
      sortPriceAsc();
      setflag(1);
    }
  }, [finalarray]);

  useEffect(() => {
    if (flag === 1) {
      setDisplayArray(finalarray);
    }
  }, [flag]);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const [accordionStates, setAccordionStates] = useState({});

  const handleAccordionToggle = (id) => {
    setAccordionStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className="mx-8 lg:mx-16 xl:mx-32">
      <div className="grid grid-cols-6 gap-x-8 md:gap-x-16">
        <div className="col-span-2">
          <div className="sticky top-0 h-screen overflow-y-scroll hide-scrollbar p-6 bg-gray-100">
            <div className="flex flex-col space-y-4">
              <div className="text-xl py-3">
                <h1>Sort by departure time</h1>
              </div>
              <div>
                <OutlineButton
                  text="Clear filter"
                  width="full"
                  onClick={clearFilter}
                />
              </div>
              <h2 className="text-2xl pt-2">Filters ~</h2>
              <div>
                <h3 className="text-lg mb-2">Brand Name:</h3>
                <BrandFilter
                  allBrands={allBrands}
                  brand={brand}
                  setBrand={setBrand}
                />
              </div>
              <div>
                <h3 className="text-lg mb-2">Flight Name:</h3>
                <AirlineFilter
                  allFlights={allFlights}
                  flight={flight}
                  setFlight={setFlight}
                />
              </div>
              <div>
                <h3 className="text-lg mb-2">No of Stops:</h3>
                <StopsFilter flightNo={flightNo} setFlightNo={setFlightNo} />
              </div>
              <div>
                <h3 className="text-lg mb-2">Price:</h3>
                <div>
                  <PriceFilter
                    myRef={myRef}
                    myRef2={myRef2}
                    sortByPrice={sortByPrice}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
      {finalarray.map((item, id) => (
        <div key={id} className="pb-16">
          <div
            className="flex border shadow-md rounded-lg hover:border-primary transition-all cursor-pointer"
            onClick={() => handleAccordionToggle(id)}
          >
            <div>
              <FlightCard
                returnBack={false}
                from={From}
                arrival={arrival}
                item={item}
                alldata={alldata}
              />
            </div>
            <div className="flex gap-2 items-center">
              {finalArrayDup.map((dup) => {
                if (
                  dup.ProductBrandOffering[0].CombinabilityCode[0] ===
                  item.ProductBrandOffering[0].CombinabilityCode[0]
                ) {
                  return (
                    <FlightCard
                      key={id}
                      returnBack={true}
                      from={From}
                      arrival={arrival}
                      item={item}
                      alldata={alldata}
                    />
                  );
                }
              })}
            </div>
          </div>
          {accordionStates[id] && (
            <div className="transition-all ease-in-out duration-300">
              <div className="bg-gray-50 rounded-xl p-10 flex flex-col gap-5 border border-primary">
                {/* Departure Card */}
                <div className="bg-white shadow-sm rounded-xl">
                  <div className="flex p-5 justify-between border-b border-slate-300">
                    <div>
                      <span className="font-medium">Depatur Title •</span>
                      <span>Depatur date</span>
                    </div>
                    <div>
                      <div className="flex flex-col gap-[5px]">
                        <div>
                          <span>departure.duration</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-5">
                    {/* Flight Details */}

                    
                    {/* <FlightDetails  /> */}
                  </div>
                </div>

                {/* Arrival Card */}
                <div className="bg-white shadow-sm rounded-xl">
                  <div className="flex p-5 justify-between border-b border-slate-300">
                    <div>
                      <span className="font-medium">arrival.title •</span>
                      <span>arrival.date</span>
                    </div>
                    <div>
                      <div className="flex flex-col gap-[5px]">
                        <div>
                          <span>arrival.duration</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-5">
                    {/* Flight Details */}
                    {finalArrayDup.map((dup) => (
                  // if (
                  //   dup.ProductBrandOffering[0].CombinabilityCode[0] ===
                  //   item.ProductBrandOffering[0].CombinabilityCode[0]
                  // ) {
                    // return (
                        <FlightDetails key={id} item={item} dup={dup} alldata={alldata}
                        />
                    // );
                  // }
                ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
      </div>
    </main>
  );
};

export default Flights;