self.onmessage = (e) => {
    const n: number = e.data;
  
    function fib(n: number): number {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    }
  
    self.postMessage(fib(n));
  };
  