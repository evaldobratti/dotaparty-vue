import axios from 'axios';
import async from 'async';

const queue = {
  _lastRequest: new Date(),
  _queue: async.queue(function(task, cb) {
    var now = new Date();
    var toWait = queue._lastRequest.getTime() - now.getTime() + 1500;
    queue._lastRequest = now;
    setTimeout(function() { task(cb) }, toWait);   
  }),
  get(url, success, failure) {
    this._queue.push(function(cb) {
      axios.get(url).then(function(response) {
        success(response);
        cb();
      }).catch(function(response) {
        if (failure)
          failure(response);
        cb();
      });
    });
  }
}

export default queue;