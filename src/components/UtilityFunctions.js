function GetPriceSort() {
  return function (a, b) {
    let firstmini = a.ProductBrandOffering[0].BestCombinablePrice.TotalPrice;
    let secondmini = b.ProductBrandOffering[0].BestCombinablePrice.TotalPrice;

    if (firstmini > secondmini) {
      return 1;
    } else if (firstmini < secondmini) {
      return -1;
    }
    return 0;
  };
}

function GetTimeSort() {
    return function (a, b) {
      if (a.DepartureTime > b.DepartureTime) {
        return 1;
      } else if (a.DepartureTime < b.DepartureTime) {
        return -1;
      }
      return 0;
    };
  }

export {GetPriceSort, GetTimeSort}