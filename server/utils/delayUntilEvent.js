const createDelayUntilEvent = () => {

  let eventArrived = false;
  let delayedResolves = [];
  const eventArrive = () => {
    eventArrived = true;
    for(const resolve of delayedResolves) {
      try {
        resolve();
      } catch (ex) {
        console.error(ex);
      }
    }
    // clear the array
    delayedResolves = [];
  };
  const delayUntilEvent = async () => {
    if (eventArrived)
      return;
    return new Promise((resolve) => {
      delayedResolves.push(resolve);
    });
  };

  return {
    eventArrive,
    delayUntilEvent,
  }
};

module.exports = createDelayUntilEvent;
