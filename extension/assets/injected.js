(function (xhr) {
  const XHR = XMLHttpRequest.prototype

  const open = XHR.open
  const send = XHR.send

  XHR.open = function (method, url) {
    this._method = method
    this._url = url
    // console.log('injected script xhr request:', method, url, args)
    return open.apply(this, arguments)
  }

  XHR.send = function (postData) {
    // console.log('injected script xhr request:', this._method, this._url, this.getAllResponseHeaders(), postData)
    this.addEventListener('load', function () {
      // const contentType = this.getResponseHeader('content-type')
      // console.log('xhr response', this._method, this._url, this.response)
      try {
        try {
          const jsonResponse = JSON.parse(this.response)
          // console.log('JSON.parse(this.response)', jsonResponse)
          if (jsonResponse) {
            window.postMessage({ type: 'xhr', method: this._method, url: this._url, data: jsonResponse }, '*') // send to content script
          }
        }
        catch (e) {
          // console.error('Response is not a valid JSON', e)
        }
      }
      catch (e) {
        console.error('xhr response error', e)
      }
    })
    return send.apply(this, arguments)
  }
})(XMLHttpRequest)

// const { fetch: origFetch } = window
// window.fetch = async (...args) => {
//   const response = await origFetch(...args)
//   // const contentType = response.headers.get('content-type')
//   // console.log('response', contentType, response)
//   if (contentType && contentType.includes('application/json')) {
//     response
//       .clone()
//       .json()
//       .then((data) => {
//         console.log('fetch response', data)
//         // window.postMessage({ type: 'fetch', url: args[0], config: args[1], data }, '*') // send to content script
//         // window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
//       })
//       .catch(err => console.error(err))
//   }
//   return response
// }
