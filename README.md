# Pi-Calculates

# How to run

1. Install dependencies
    before running, make sure you install the dependencies by running:
    `npm install`
2. Run server
    - run the code using `npm start`
    - get the value of pi using `https://localhost:3000/`

# Notes

The algorithm used to calculate the PI value to increasing accuracy is called [Ramanujan's sum](https://crypto.stanford.edu/pbc/notes/pi/ramanujan.html) algorithm.

The module used to create workers is `cluster` module.

The server starts a worker that keeps calculating PI to an increasing accuracy. Every time the worker calculates a value, the master prints that value and asks the worker to calculate the next value.
When the endpoint is called, the master returns the latest calculated PI value.