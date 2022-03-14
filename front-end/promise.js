const states = {
    pending: 'PENDING',
    resolved: 'RESOLVED',
    rejected: 'REJECTED'
};

/**
 * Promise implementation. Borrowed from:
 * https://levelup.gitconnected.com/understand-javascript-promises-by-building-a-promise-from-scratch-84c0fd855720
 * @class Promise
 */
class Promise {
    status = states.pending;
    value = undefined;
    promiseChain = [];
    errorHandler = () => {
    };

    /**
     * Our constructor.
     * The exec handler takes two params, resolve and reject functions
     * @param {function} executor
     */
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new Error(`Expected function but received ${typeof executor}`);
        }

        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);

        executor(this.resolve, this.reject);
    }

    /**
     * Call all callbacks in promise chain
     * @param value
     * @returns {Promise}
     */
    resolve(value) {
        try {
            this.value = value;
            this.promiseChain.forEach((nextCallback) => {
                this.value = nextCallback(this.value);
            });
            this.status = states.resolved;
        } catch (error) {
            this.reject(error);
        }
        return this;
    }

    /**
     * Rejects our promise and clears promise chain
     * @param error
     */
    reject(error) {

        this.status = states.rejected;
        this.value = error;

        // clear out  promise chain on rejection
        this.promiseChain = [];
        this.errorHandler(error);
    }

    /**
     * Add callbacks to promise chain if in pending state otherwise resolve right a way
     * @param callback
     * @returns {Promise}
     */
    then(callback) {
        if (this.status === states.pending) {
            this.promiseChain.push(callback);
        } else if (this.status === states.resolved) {
            callback(this.value);
        }

        return this;
    }

    /**
     * Set our error handler
     * @param callback
     * @returns {Promise}
     */
    catch(callback) {
        this.errorHandler = callback;
        return this;
    }
}


/* Tests */

fakeApiBackend = () => {
    const user = {
        username: 'treyhuffine',
        favoriteNumber: 42,
        profile: 'https://gitconnected.com/treyhuffine'
    };

    // Introduce a randomizer to simulate the
    // the probability of encountering an error
    if (Math.random() > .05) {
        return {
            data: user,
            statusCode: 200,
        };
    } else {
        const error = {
            statusCode: 404,
            message: 'Could not find user',
            error: 'Not Found',
        };

        return error;
    }
};

// Assume this is your AJAX library. Almost all newer
// ones return a Promise Object
const makeApiCall = () => {
    return new Promise((resolve, reject) => {
        // Use a timeout to simulate the network delay waiting for the response.
        // This is THE reason you use a promise. It waits for the API to respond
        // and after received, it executes code in the `then()` blocks in order.
        // If it executed is immediately, there would be no data.
        setTimeout(() => {
            const apiResponse = fakeApiBackend();

            if (apiResponse.statusCode >= 400) {
                reject(apiResponse);
            } else {
                resolve(apiResponse.data);
            }
        }, 5000);
    });
};

makeApiCall()
    .then((user) => {
        console.log('In the first .then()');

        return user;
    })
    .then((user) => {
        console.log(`User ${user.username}'s favorite number is ${user.favoriteNumber}`);

        return user;
    })
    .then((user) => {
        console.log('The previous .then() told you the favoriteNumber')

        return user.profile;
    })
    .then((profile) => {
        console.log(`The profile URL is ${profile}`);
    })
    .then(() => {
        console.log('This is the last then()');
    })
    .catch((error) => {
        console.error(error.message);
    });