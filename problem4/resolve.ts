/**
 * Problem 4: Three ways to sum to n
 * 
 * Three different implementations to calculate the sum from 1 to n
 * Each with different time and space complexity characteristics
 */

/**
 * Method 1: Iterative approach
 * Time Complexity: O(n) - Linear time
 * Space Complexity: O(1) - Constant space
 * 
 * Simple loop that adds each number from 1 to n
 * Good for small values of n, straightforward and readable
 */
function sum_to_n_a(n: number): number {
    if (n <= 0) return 0;
    
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Method 2: Mathematical formula (Gauss's formula)
 * Time Complexity: O(1) - Constant time
 * Space Complexity: O(1) - Constant space
 * 
 * Uses the mathematical formula: sum = n * (n + 1) / 2
 * Most efficient for any value of n, but requires understanding of the formula
 */
function sum_to_n_b(n: number): number {
    if (n <= 0) return 0;
    
    return (n * (n + 1)) / 2;
}

/**
 * Method 3: Recursive approach
 * Time Complexity: O(n) - Linear time
 * Space Complexity: O(n) - Linear space (due to call stack)
 * 
 * Recursive function that breaks down the problem
 * Elegant solution but less efficient due to function call overhead and stack space
 */
function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    return n + sum_to_n_c(n - 1);
}
