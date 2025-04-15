import axios from "axios";

export interface DataFilter {
  where: any;
  include: any;
  orderBy: any;
  take: number;
  skip: number;
}

export class ApiMA {
  axios: any;
  baseUrl: string;
  static instance: ApiMA;
  lastResponseHeaders: any;

  constructor() {
    this.baseUrl = import.meta.env.PUBLIC_API;
    axios.defaults.baseURL = this.baseUrl;
    axios.defaults.headers.common['Authorization'] = import.meta.env.PUBLIC_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    this.axios = axios.create();
  }

  static getInstance() {
    if(!ApiMA.instance) {
      ApiMA.instance = new ApiMA();
    }
    return ApiMA.instance;
  }

  async save(moduleName: string, data: any) {
    let response;
    if(data.id) {
      response = await this.axios.put(`/${moduleName}`, data);
    } else {
      response = await this.axios.post(`/${moduleName}`, data);
    }
    this.lastResponseHeaders = response.headers;
    return response.data;
  }

  async remove(moduleName: string, id: string) {
    let response = await this.axios.delete(`/${moduleName}/${id}`);
    this.lastResponseHeaders = response.headers;
    return response.data;
  }

  async findById(moduleName: string, id: string) {
    let response = await this.axios.get(`/${moduleName}/${id}`);
    this.lastResponseHeaders = response.headers;
    return response.data;
  }

  async findAll(moduleName: string) {
    let response = await this.axios.get(`/${moduleName}`);
    this.lastResponseHeaders = response.headers;
    return response.data;
  }

  async findFilter(moduleName: string, dataFilter: DataFilter) {
    let response = await this.axios.post(`/${moduleName}`, dataFilter);
    this.lastResponseHeaders = response.headers;
    return response.data;
  }

  async count(moduleName: string) {
    let response = await this.axios.get(`/${moduleName}/count`);
    this.lastResponseHeaders = response.headers;
    return response.data;
  }
}