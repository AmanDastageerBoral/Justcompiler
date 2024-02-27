import numpy as np

# Dictionary to store computed Fibonacci values
fib_cache = {}

def fibonacci(n):
    if n in fib_cache:
        return fib_cache[n]
    if n == 0:
        result = 0
    elif n == 1:
        result = 1
    else:
        result = fibonacci(n - 1) + fibonacci(n - 2)
    fib_cache[n] = result
    return result

def main():
    n = 10  # Calculate the first 10 Fibonacci numbers
    print(f"Calculating the first {n} Fibonacci numbers:")
    for i in range(n):
        print(f"Fibonacci({i}): {fibonacci(i)}")

if __name__ == "__main__":
    main()
