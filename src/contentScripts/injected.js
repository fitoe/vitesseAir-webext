(function (xhr) {
  const XHR = XMLHttpRequest.prototype

  const open = XHR.open
  const send = XHR.send

  XHR.open = function (method, url) {
    this._method = method
    this._url = url
    return open.apply(this, arguments)
  }

  XHR.send = function (postData) {
    // console.log('injected script xhr request:', this._method, this._url, this.getAllResponseHeaders(), postData)
    this.addEventListener('load', function () {
      window.postMessage({ type: 'xhr', url: this._url, data: this.response }, '*') // send to content script
    })
    return send.apply(this, arguments)
  }
})(XMLHttpRequest)

const { fetch: origFetch } = window
window.fetch = async (...args) => {
  const response = await origFetch(...args)
  // console.log('injected script fetch request:', args)
  response
    .clone()
    .blob() // maybe json(), text(), blob()
    .then((data) => {
      window.postMessage({ type: 'fetch', data }, '*') // send to content script
      // window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
    })
    .catch(err => console.error(err))
  return response
}
