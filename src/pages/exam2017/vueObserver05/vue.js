
var Vue = function(obj) {
  var that = this
  this.data = obj.data
  this.el = obj.el
  this.watchKeysList = []
  var appElement = document.querySelector(obj.el)
  this.appElement = appElement
  this.$template = appElement.cloneNode(true)
  this.$template2 = appElement.cloneNode(true)
  var appString = appElement.innerHTML
  traverseElement(appElement.children)
  var abserverData = new Observer(this.data)
  abserverData.$watch('user', function(oldVal, newVal) {
    console.log(that.data);
    console.log('我的姓名变了， 旧姓名是' + oldVal + '新姓名是' + newVal)
    this.appElement = traverseElement(that.$template2.children)
  })
  abserverData.$watch('school', function(oldVal, newVal) {
    console.log(that.data);
    console.log('我的学校变了， 旧学校是' + oldVal + '新学校是' + newVal)
    this.appElement = traverseElement(that.$template2.children)
  })
  function traverseElement(element) {
    for (var child of element) {
      if (child.children.length > 0) {
        child = traverseElement(child) // 递归
      }
      // console.log(changeElment.call(that, child));
      // child.replaceChild(changeElment.call(that, child), child)
      if (child.hasChildNodes()) {
        for (var variable of child.childNodes) {
          var ele = document.createTextNode(changeElment(variable))
          console.log(ele);
          console.log(child);
          child.replaceChild(ele, variable)
          // child.appendChild(ele)
        }
        // Array.from(child.childNodes).forEach(changeElment)
        // var changeText = changeElment.call(that, child.childNodes)
      }
    }
    return element
  }
  function changeElment(opt) {
    var changedOpt = '';
    if (!opt) {
      return
    }
    var matchResult = opt.nodeValue.match(/{{\s*[\w\.]+\s*}}/g)
    if (matchResult && matchResult.length === 1) {
      var needChangeText = matchResult[0].substr(2, matchResult[0].length - 4)
      var keyList = needChangeText.split('.')
      var tempObj = that.data
      for (var i = 0; i < keyList.length; i++) {
        if (!tempObj[keyList[i]]) {
          console.log('输入了不可列举的key');
          break
        } else {
          tempObj = tempObj[keyList[i]]
        }
        if (i === keyList.length - 1) {
          changedOpt = tempObj
        }
      }
    } else {
      changedOpt = opt.nodeValue
    }
    return changedOpt
  }
}

function Observer(data, objKey, $parents) {
  this.data = data
  this.watchKey = objKey
  this.$parents = $parents
  this.walk(data)
  this.eventsBus = new Event()
}
let p = Observer.prototype

p.walk = function(obj) {
  let val
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key]
      if (typeof val === 'object') {
        new Observer(val, key, this)
      }
      this.convert(key, val)
    }
  }
}
p.convert = function(key, val) {
  var self = this
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('你访问了' + key)
      return val
    },
    set: function(newVal) {
      console.log('你设置了' + key)
      console.log('新的' + key + ' = ' + newVal)
      if (newVal === val) {
        return
      }
      if (typeof newVal === 'object') {
        new Observer(newVal, key, self)
      }
      if (self.watchKey) {
        self.$parents.eventsBus.emit(self.watchKey, val, newVal)
      } else {
        self.eventsBus.emit(key, val, newVal)
      }
      val = newVal
    }
  })
  p.$watch = function(attr, callback){
    this.eventsBus.on(attr, callback)
  }
}
function Event() {
  this.events = {}
}
Event.prototype.on = function(attr, callback) {
  if (this.events[attr]) {
    this.events[attr].push(callback)
  } else {
    this.events[attr] = [callback]
  }
}
Event.prototype.off = function(attr) {
  for (var key in this.events) {
    if (this.events.hasOwnProperty(key) && key ===  attr) {
      delete this.events[key]
    }
  }
}
Event.prototype.emit = function(attr, ...arg) {
  this.events[attr] && this.events[attr].forEach(function(item) {
    item(...arg)
  })
}
