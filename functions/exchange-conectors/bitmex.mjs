//cc @nodejs/modules
import crypto from 'crypto'
import qs from 'qs'
import fetch from 'node-fetch'
import passwords from '../security/api-keys'

class BitMexPlus {
  constructor(options) {
    this.options = options
  }

  makeRequest(verb, endpoint, data = {}) {
    const apiRoot = '/api/v1/'

    let query = '',
      postBody = ''
    if (verb === 'GET') query = '?' + qs.stringify(data)
    // Pre-compute the postBody so we can be sure that we're using *exactly* the same body in the request
    // and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
    else postBody = JSON.stringify(data)

    const headers = {
      'content-type': 'application/json',
      accept: 'application/json',
      // This example uses the 'expires' scheme. You can also use the 'nonce' scheme.
      // See https://www.bitmex.com/app/apiKeysUsage for more details.
    }

    if (this.options.apiKeyID && this.options.apiKeySecret) {
      const expires = new Date().getTime() + 60 * 1000 // 1 min in the future
      const signature = crypto
        .createHmac('sha256', this.options.apiKeySecret)
        .update(verb + apiRoot + endpoint + query + expires + postBody)
        .digest('hex')
      headers['api-expires'] = expires
      headers['api-key'] = this.options.apiKeyID
      headers['api-signature'] = signature
    }

    const requestOptions = {
      method: verb,
      headers,
    }

    if (verb !== 'GET') requestOptions.body = postBody // GET/HEAD requests can't have body

    const apiBase = this.options.testnet
      ? 'https://testnet.bitmex.com'
      : 'https://www.bitmex.com'
    const url = apiBase + apiRoot + endpoint + query

    return fetch(url, requestOptions)
      .then(response => response.json())
      .then(
        response => {
          if ('error' in response)
            throw new Error(
              `❌ ${
                response.error.message
              } during ${verb} ${endpoint} with ${JSON.stringify(data)}`,
            )
          return response
        },
        error => {
          throw new Error(error)
        },
      )
  }
}

// export const bitmex = new BitMexPlus(passwords.bitmex(true))
export const bitmex = new BitMexPlus(passwords.bitmex(false))
