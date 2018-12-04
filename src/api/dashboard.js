  /*============= api ============*/
  import request from "../utils/request.js"

  export function get() {
    return request({
      url: '/api/dashboard/get',
      method: 'get'
    })
  }