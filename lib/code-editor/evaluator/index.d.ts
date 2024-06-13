type Values = { [key: string]: any };
type FunctionExpression = (...args) => [any, string | null];

export type EvaluateFunc = <T>(
  expression: string,
  values: Values,
  functions: { [key: string]: FunctionExpression }
) => [T, string | null];

declare const Evaluate: EvaluateFunc;

export { Evaluate };

export default Evaluate;
