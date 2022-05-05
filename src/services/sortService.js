
export function sortLoop(sortType, orderType) {
    return (a, b) => {      
      if (sortType === "counter") {
        const response = a.counter - b.counter;
        if (response === 0) {
          return Date.parse(b.date) - Date.parse(a.date);
        }
        return response * (orderType === "asc" ? 1 : -1);
      }
  
      const response = Date.parse(a.date) - Date.parse(b.date);
      if (response === 0) {
        return b.counter - a.counter;
      }
      return response * (orderType === "asc" ? 1 : -1);
    };
  }
  