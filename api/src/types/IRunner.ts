/**
 * Run method type declaration.
 */
type Run<T> = () => Promise<T>;

/**
 * Respository runner.
 *
 * @export
 * @interface IRunner
 * @template T
 */
export interface IRunner<T> {
    run: Run<T>;
}
