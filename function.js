function ajax(url,data,callback) {
  console.log('url',url)
  console.log('data',data)
  callback()
}
function getPerson(data,cb) {
  ajax('url',data,cb)
}
function getOrder(data,cb) {
  ajax('url2',data,cb)
}
function partial(fn,...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs,...laterArgs)
  }
}
