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

/**
 * Delete
 *
 * @param data Data
 */
export function fetchDelete(data: any) {
  return request({
    url: "/code/delete",
    method: "post",
    data: data,
  });
}

/**
 * Switch
 *
 * @param data Data
 */
export function fetchSwitch(data: any) {
  return request({
    url: "/code/switch",
    method: "post",
    data: data,
  });
}
