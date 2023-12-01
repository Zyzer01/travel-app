import { FilledButton } from "./ui/FilledButton";

const FlightCard = ({ returnBack, from, arrival, item, alldata }) => {
  const renderFlightDetails = () => (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        className="relative peer shrink-0 appearance-none w-4 h-4 border-2 border-red-500 rounded-sm bg-white checked:bg-primary checked:border-0"
      />
      <div>
        {!returnBack && (
          <h2>
            {from} to {arrival}
          </h2>
        )}
        {returnBack && (
          <h2>
            {arrival} to {from}
          </h2>
        )}
      </div>
      <div>
        <p className="font-bold">
          No. of stops:{" "}
          <span className="text-primary font-normal">
            {item.flightRefs.length}
          </span>
        </p>
      </div>
      <div>
        <div className="flex flex-col gap-1">
          <div>
            {item.ProductBrandOffering.map((x, id) => (
              <p key={id} className="font-bold">
                Total Duration:{" "}
                <span className="text-primary font-normal">
                  {getTotalDuration(x)}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const getTotalDuration = (productBrand) =>
    productBrand.Product.map((aa) =>
      alldata.ReferenceList[1].Product.map((y) => {
        if (y.id === aa?.productRef) {
          return y.totalDuration;
        }
        return null;
      })
    );

  const renderPriceDetails = () => (
    <div className="bg-slate-300 w-1"></div>
  );

  const renderBookingDetails = () => (
    <div className="p-5 flex flex-col gap-4">
      <div>
        <p>Total Price:</p>
        <p className="text-xl font-bold pt-2">
          ${item.ProductBrandOffering[0].BestCombinablePrice.TotalPrice}
        </p>
      </div>
      <div>
        <FilledButton text="Book" width="full" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-5 gap-4 justify-center">
      <div className="flex gap-2 items-center">
        {renderFlightDetails()}
        {renderPriceDetails()}
        {renderBookingDetails()}
      </div>
    </div>
  );
};

export default FlightCard;
