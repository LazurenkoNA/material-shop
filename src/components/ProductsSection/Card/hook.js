const useCardItem = () => {
  const setDiscountDate = (discountedDate) => {
    if (discountedDate) {
      const nowDate = Date.now();
      const endSale = new Date(discountedDate);
      let result;

      const timeToEndSale = new Date(endSale - nowDate);

      // ~ If date <= 0
      if (timeToEndSale <= 0) {
        result = 'Sale end 😔';
        return result;
      }

      // Counting days
      let seconds = Math.floor(timeToEndSale / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // Counting rest data
      hours %= 24;
      seconds %= 60;
      minutes %= 60;

      const templateDays = days ? `${days} days` : '';

      // result = `End sale across ${templateDays} ${hours}:${minutes}:${seconds}`;

      result = `End sale across ${templateDays}`;

      return result;
    }
    return '';
  };

  return {
    setDiscountDate,
  };
};

export default useCardItem;
