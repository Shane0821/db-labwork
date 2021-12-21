import axios from "axios";

export const staticApi = axios.create({
  baseURL: 'http://localhost:4040',
  headers: { 'X-Custom-Header': 'foobar' },
  transformResponse(data: any) {
    // 对 data 进行任意转换处理
    const parsedData = JSON.parse(data)
    return parsedData
  }
})