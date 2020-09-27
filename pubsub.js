const cache = {};

module.exports = {
  pub(eventId) {
    /**
     *
     * First thing we want to do is allow people to provide in as many arguments.
     * For this, we can take leverage of arguments array
     */
    const args = [].slice.call(arguments, 1);
    /**
     *  Here we are creating empty array so that we can access slice method of an array.
     * As we have to remove the first value from an array which is the ID of the
     * event published and store rest of the arguments.
     */
    /**
     * From the slice method, we're invoking call, which allows us to provide this(special JS Object)
     * content for the function that's being executed as well.as any arguments that are to passed to it.
     */
    /** Because the arguments object is actually not and array, it is just an array-like in Javascript
     * Doing this allows us to perform operations and return it
     * as an actual array essentially converting it into an array
     *
     */
    if (!cache[eventId]) {
      /**
       * Check if the event id has been used before. If this is first time
       * then save the eventId in cache
       */
      cache[eventId] = [];
    }

    const callbacksLength = cache[eventId].length;
    for (let i = 0; i < callbacksLength; i++) {
      /** Looping through all the functions that have been provided with inside
       *  our cache object for this particular eventId.
       */
      cache[eventId][i].apply(null, args);
      /** Using the apply method to invoke callbacks attached to eventId
       * in a null discontext because there is
       * no relevant context for this particular operation, as well
       * as the arguments that have been provided to be passed through
       */
      /** Reason of apply instead of call: We can pass n number of arguments as array
       * as call takes comma separated values
       */
    }
  },
  sub(eventId, fn) {
    /** Here we need the eventID and the function we want to execute */
    if (!cache[eventId]) {
      /**
       * If there is not event registered for the eventID
       * register it
       */
      cache[eventId] = [fn];
    } else {
      /**
       * If we already have eventId, push the callback function in
       * array corresponding to the eventId
       */
      cache[eventId].push(fn);
    }
  },
  unsub(id, fn) {
    /** if no eventId is provided make a return */
    if (!id) {
      return;
    }

    /** we also want to determine whether a callback handler
     * has actually been provided
     * If no callback handler has been provided then we are assuming
     * that we have to remove all callbacks associated to passed eventId
     */
    if (!fn) {
      cache[id] = [];
    } else {
      const index = cache[id].indexOf(fn);
      if (index > 1) {
        /**
         * Here we are just remove element at particular index.
         * And using concat to get new array.
         */
        cache[id] = cache[id]
          .slice(0, index)
          .concat(cache[id].slice(index + 1));
      }
    }
  },
};
