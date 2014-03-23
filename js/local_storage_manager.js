window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.storage = this.localStorageSupported()
  		? window.localStorage
  		: window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";
  try {
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

LocalStorageManager.prototype.get = function (key) {
  return this.storage.getItem(key) || 0;
};

LocalStorageManager.prototype.set = function (key, value) {
  this.storage.setItem(key, value);
};

LocalStorageManager.prototype.clear = function (key) {
  this.storage.clear(key);
};
