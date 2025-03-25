import { request } from "../request";

/**
 * Create or update
 *
 * @param data Data
 */
export function fetchCreate(data: any) {
  return request({
    url: "/code/create",
    method: "post",
    data: data,
  });
}

/**
 * List
 *
 * @param data Data
 */
export function fetchList() {
  return request({
    url: "/code/list",
    method: "post",
  });
}

/**
 * Update
 *
 * @param data Data
 */
export function fetchUpdate(data: any) {
  return request({
    url: "/code/update",
    method: "post",
    data: data,
  });
}
