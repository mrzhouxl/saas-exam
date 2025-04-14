export interface Error { message: string, data?: any, type: any }
export interface Success { data: any, type: string }
export interface Result { code: string|number, data: any, message: string }
export class Result {
  constructor() { }

  static error(message: string): Error {
    return {
      type: 'error',
      message
    }
  }

  static success(data: any) {
    return {
      status:'success',
      type: 'success',
      data
    }
  }

  static result(code: string | number, data: any, message?: string): Result {
    return {
      code,
      message,
      data
    }
  }

}