export class ConcurrencyLimiter {
    private tasks: (() => Promise<any>)[] = [];
    private activeCount = 0;
  
    constructor(private concurrencyLimit: number) {}
  
    async run(task: () => Promise<any>) {
      if (this.activeCount < this.concurrencyLimit) {
        this.activeCount++;
        try {
          return await task();
        } finally {
          this.activeCount--;
          this.runNext();
        }
      } else {
        return new Promise((resolve, reject) => {
          this.tasks.push(() => task().then(resolve, reject));
        });
      }
    }
  
    private runNext() {
      if (this.tasks.length > 0 && this.activeCount < this.concurrencyLimit) {
        const nextTask = this.tasks.shift()!;
        this.run(nextTask);
      }
    }
  }
  