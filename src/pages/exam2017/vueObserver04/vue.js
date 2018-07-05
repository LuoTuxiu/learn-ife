
var Vue = function(obj) {
  var that = this
  this.data = obj.data
  this.el = obj.el
  var appElement = document.getElementById('app');
  var appString = appElement.innerHTML
  traverseElement(appElement.children)
  function traverseElement(element) {
    for (var child of element) {
      if (child.children.length > 0) {
        traverseElement(child) // 递归
      }
      child.innerHTML = changeElment.call(that, child)
    }
  }
  function changeElment(opt) {
    var changedOpt = '';
    var matchResult = opt.innerText.match(/{{\s*[\w\.]+\s*}}/g)
    if (matchResult.length === 1) {
      var needChangeText = matchResult[0].substr(2, matchResult[0].length - 4)
      var keyList = needChangeText.split('.')
      var tempObj = this.data
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
    }
    return changedOpt
  }
}
