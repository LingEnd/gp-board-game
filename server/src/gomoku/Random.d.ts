/**
 *
 * @param {number} alpha shape parameter
 * @param {number} beta scale parameter
 */
export function gamma(alpha: number, beta: number): number;
/**
 * @param {number[]} a
 * @param {number[]} [out]
 */
export function dirichlet(a: number[], out?: number[] | undefined): number[];
/**
 *
 * @param {number} k
 * @param {number} a
 * @param {number[]} [out]
 */
export function dirichletK(k: number, a: number, out?: number[] | undefined): number[];
/**
 * @template T
 * @param {T[]} targets
 * @param {number[]} [weights]
 */
export function randomPick<T>(targets: T[], weights?: number[] | undefined): T;
