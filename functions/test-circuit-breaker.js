exports.lambdaHandler = async (fnData, context) => {
    await sleep(15000);
    return fnData;
  };
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }