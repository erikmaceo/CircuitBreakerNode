exports.lambdaHandler = async (event, context) => {
    console.log('Hello World from successful circuit');
    return event;
  };