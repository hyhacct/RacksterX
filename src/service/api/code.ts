import { request } from "../request";

/**
 * Create or update
 *
 * @param data Data
 */
export function fetchCreateOrUpdate(data: any) {
  return request({
    url: "/code/createOrUpdate",
    method: "post",
    data: data,
  });
}

/**
 * List
 *
 * @param data Data
 */
export function fetchList(data: any) {
  return request({
    url: "/code/list",
    method: "post",
    data: data,
  });
}
