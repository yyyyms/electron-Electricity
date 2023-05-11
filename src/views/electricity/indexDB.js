function openDB(dbName, version = 1) {
    return new Promise((resolve) => {
      //  兼容浏览器
      var indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
      let db;
      // 打开数据库，若没有则会创建
      const request = indexedDB.open(dbName, version);
      // 数据库打开成功回调
      request.onsuccess = function (event) {
        db = event.target.result; // 数据库对象
        console.log("数据库打开成功");
        resolve(db);
      };
      // 数据库打开失败的回调
      request.onerror = function (event) {
        console.log("数据库打开报错",event);
      };
      // 数据库有更新时候的回调
      request.onupgradeneeded = function (event) {
        // 数据库创建或升级的时候会触发
        console.log("onupgradeneeded");
        db = event.target.result; // 数据库对象
        var objectStore;
        // 创建存储库
        objectStore = db.createObjectStore("signalChat", {
          keyPath: "sequenceId", // 这是主键
          // autoIncrement: true // 实现自增
        });
        // 创建索引，在后面查询数据的时候可以根据索引查
        objectStore.createIndex("link", "link", { unique: false }); 
        objectStore.createIndex("sequenceId", "sequenceId", { unique: false });
        objectStore.createIndex("messageType", "messageType", {
          unique: false,
        });
      };
    });
  }
export {openDB}