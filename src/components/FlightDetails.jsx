const FlightDetails = ({item, dup, alldata}) => {
  return (
    <div className="bg-[#f5f6f8] rounded-xl p-10 flex flex-col gap-5">
        {/* Departure */}
      <div className="bg-white shadow-sm rounded-xl">
        <div className="flex p-5 justify-between border-b border-slate-300">
          <div>
            <span className="font-medium">Depart •</span>
            <span>--Departure Date--</span>
          </div>
          <div>
            {item.ProductBrandOffering.map((x, id) => {
              return (
                <div key={id} className="flex flex-col gap-[5px]">
                  <div>
                    <span>
                      {x.Product.map((aa) => {
                        return alldata.ReferenceList[1].Product.map((y) => {
                          if (y.id === aa?.productRef) {
                            return y.totalDuration;
                          }
                        });
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-5 flex flex-col gap-5">
            <div className='flex flex-col gap-[5px]'>
            {item.flightRefs.map((alp) => {
              return (
                <div className='flex gap-[5px]'>
                  {alldata.ReferenceList[0].Flight.map((y) => {
                    if (y.id === alp) {
                      return (
                        <div className="flex gap-5">
                          <p>
                            <span className='font-bold'>
                              From -{" "}
                            </span>{" "}
                            {y.Departure.location}
                          </p>
                          <p>
                            <span className='font-bold'>
                              To -{" "}
                            </span>{" "}
                            {y.Arrival.location}
                          </p>
                          <p>
                            <span className='font-bold'>
                              Duration -{" "}
                            </span>{" "}
                            {y.duration}
                          </p>
                          <p>
                            <span className='font-bold'>
                              AirlineCarrier -{" "}
                            </span>{" "}
                            {y.carrier}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
            </div>
            <div className="flex flex-col gap-5">
                <div>
                    <p>
                    <span className='font-bold'>Departure Date - </span>
                    {item.DepartureTime}
                    </p>
                    <p>
                    <span className='font-bold'>Arrival Date - </span>
                    {item.ArrivalTime}
                    </p>
                </div>
                {item.ProductBrandOffering.map((x) => {
                return (
                    <div className='flex flex-col gap-[5px]'>
                    <div>
                        <span className='font-bold'>
                        Brand Name -{" "}
                        </span>
                        <span>
                        {alldata.ReferenceList[3].Brand.map((y) => {
                            if (y.id === x?.Brand?.BrandRef) {
                            // setBrandList(oldArray => [...oldArray, y.name])
                            return y.name;
                            }
                        })}
                        </span>
                        <p>
                        <span className='italic'>
                            Base Price -{" "}
                        </span>
                        {x.Price.Base}
                        </p>
                        <p>
                        <span className='italic'>
                            Total Taxes-{" "}
                        </span>
                        {x.Price.TotalTaxes}
                        </p>
                        <p>
                        <span className='italic'>
                            Total Price -{" "}
                        </span>
                        {x.Price.TotalPrice}
                        </p>
                    </div>
                    <div>
                        <span className='font-bold'>
                        Total Duration -{" "}
                        </span>
                        <span>
                        {x.Product.map((aa) => {
                            return alldata.ReferenceList[1].Product.map((y) => {
                            if (y.id === aa?.productRef) {
                                return y.totalDuration;
                            }
                            });
                        })}
                        </span>
                    </div>
                    <div>
                        <span className='font-bold'>
                        Validating Airlines -{" "}
                        </span>
                        <span>
                        {alldata.ReferenceList[2].TermsAndConditions.map(
                            (y) => {
                            if (
                                y.id ===
                                x.TermsAndConditions?.termsAndConditionsRef
                            ) {
                                return y.ValidatingAirline.map((air) => {
                                return air.ValidatingAirline;
                                });
                            }
                            }
                        )}
                        </span>
                    </div>
                    </div>
                );
                })}
          </div>
        </div>
      </div>

        {/* Arrival */}
      <div className="bg-white shadow-sm rounded-xl">
        <div className="flex p-5 justify-between border-b border-slate-300">
          <div>
            <span className="font-medium">Arrival •</span>
            <span>--Arrival Date--</span>
          </div>
          <div>
            {dup.ProductBrandOffering.map((x) => {
              return (
                <div className="flex flex-col gap-[5px]">
                  <div>
                    <span>
                      {x.Product.map((aa) => {
                        return alldata.ReferenceList[1].Product.map((y) => {
                          if (y.id === aa?.productRef) {
                            return y.totalDuration;
                          }
                        });
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-5 flex flex-col gap-5">
            <div className='flex flex-col gap-[5px]'>
            {dup.flightRefs.map((alp) => {
              return (
                <div className='flex gap-[5px]'>
                  {alldata.ReferenceList[0].Flight.map((y) => {
                    if (y.id === alp) {
                      return (
                        <div className="flex gap-5">
                          <p>
                            <span className='font-bold'>
                              From -{" "}
                            </span>{" "}
                            {y.Departure.location}
                          </p>
                          <p>
                            <span className='font-bold'>
                              To -{" "}
                            </span>{" "}
                            {y.Arrival.location}
                          </p>
                          <p>
                            <span className='font-bold'>
                              Duration -{" "}
                            </span>{" "}
                            {y.duration}
                          </p>
                          <p>
                            <span className='font-bold'>
                              AirlineCarrier -{" "}
                            </span>{" "}
                            {y.carrier}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
            </div>
            <div className="flex flex-col gap-5">
                <div>
                    <p>
                    <span className='font-bold'>Departure Date - </span>
                    {dup.DepartureTime}
                    </p>
                    <p>
                    <span className='font-bold'>Arrival Date - </span>
                    {dup.ArrivalTime}
                    </p>
                </div>
                {dup.ProductBrandOffering.map((x) => {
                return (
                    <div className='flex flex-col gap-[5px]'>
                    <div>
                        <span className='font-bold'>
                        Brand Name -{" "}
                        </span>
                        <span>
                        {alldata.ReferenceList[3].Brand.map((y) => {
                            if (y.id === x?.Brand?.BrandRef) {
                            // setBrandList(oldArray => [...oldArray, y.name])
                            return y.name;
                            }
                        })}
                        </span>
                        <p>
                        <span className='italic'>
                            Base Price -{" "}
                        </span>
                        {x.Price.Base}
                        </p>
                        <p>
                        <span className='italic'>
                            Total Taxes-{" "}
                        </span>
                        {x.Price.TotalTaxes}
                        </p>
                        <p>
                        <span className='italic'>
                            Total Price -{" "}
                        </span>
                        {x.Price.TotalPrice}
                        </p>
                    </div>
                    <div>
                        <span className='font-bold'>
                        Total Duration -{" "}
                        </span>
                        <span>
                        {x.Product.map((aa) => {
                            return alldata.ReferenceList[1].Product.map((y) => {
                            if (y.id === aa?.productRef) {
                                return y.totalDuration;
                            }
                            });
                        })}
                        </span>
                    </div>
                    <div>
                        <span className='font-bold'>
                        Validating Airlines -{" "}
                        </span>
                        <span>
                        {alldata.ReferenceList[2].TermsAndConditions.map(
                            (y) => {
                            if (
                                y.id ===
                                x.TermsAndConditions?.termsAndConditionsRef
                            ) {
                                return y.ValidatingAirline.map((air) => {
                                return air.ValidatingAirline;
                                });
                            }
                            }
                        )}
                        </span>
                    </div>
                    </div>
                );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
