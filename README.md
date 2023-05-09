# CircuitBreakerNode
SAM Step Functions Node

Para simular una ejecución exitosa, use la función HelloWorld Lambda proporcionada pasando el nombre o el ARN de la función Lambda que ha creado la pila. Su entrada aparece de la siguiente manera:

{
  "TargetLambda": "circuit-breaker-stack-HelloWorldFunction-pP1HNkJGugQz"
}

Durante la ejecución correcta, el paso Obtener estado del circuito compara el estado del circuito con la tabla de DynamoDB. Suponga que el circuito está CERRADO, lo que se indica mediante cero registros para ese servicio en la tabla de DynamoDB. En ese caso, el paso Ejecutar Lambda ejecuta la función Lambda y sale del flujo de trabajo correctamente.
