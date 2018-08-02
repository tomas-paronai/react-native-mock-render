/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Storage/AsyncStorage.js
 */

function wrap(value, callback) {
  return Promise.resolve(value).then(
    obj => {
      if (callback) {
        callback(null, obj);
      }
      return obj;
    },
    err => {
      if (callback) {
        callback(err);
      }
      throw err;
    }
  );
}

let db = {};

const AsyncStorage = {
  setItem: jest.fn((item, value) => {
    return new Promise((resolve, reject) => {
      db[item] = value;
      resolve(value);
    });
  }),
  multiSet: jest.fn((item, value) => {
    return new Promise((resolve, reject) => {
      db[item] = value;
      resolve(value);
    });
  }),
  getItem: jest.fn((item, value) => {
    return new Promise((resolve, reject) => {
      resolve(db[item]);
    });
  }),
  multiGet: jest.fn(item => {
    return new Promise((resolve, reject) => {
      resolve(db[item]);
    });
  }),
  removeItem: jest.fn(item => {
    return new Promise((resolve, reject) => {
      resolve(delete db[item]);
    });
  }),
  getAllKeys: jest.fn(items => {
    return new Promise(resolve => {
      resolve(db.keys());
    });
  }),

  mergeItem(key, value, callback) {
    db[key] = Object.assign({}, db[key] || {}, value);
    return wrap(null, callback);
  },

  clear(callback) {
    db = {};
    return wrap(null, callback);
  },

  flushGetRequests() {},

  multiRemove(keys, callback) {
    keys.forEach(key => delete db[key]);
    return wrap(null, callback);
  },

  multiMerge(keyValuePairs, callback) {
    keyValuePairs.forEach(([key, value]) => {
      db[key] = Object.asign({}, db[key] || {}, value);
    });
    return wrap(null, callback);
  }
};

module.exports = AsyncStorage;
