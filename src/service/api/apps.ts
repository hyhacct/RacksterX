import { request } from "../request";

/**
 * Create or update
 *
 * @param data Data
 */
export function fetchCreateOrUpdate(data: any) {
  return request({
    url: "/apps/createOrUpdate",
    method: "post",
    data: data,
  });
}

/**
 * Get apps list
 *
 * @param data Data
 */
export function fetchAppsList() {
  return request({
    url: "/apps/list",
    method: "post",
  });
}

/**
 * Delete app
 *
 * @param data Data
 */
export function fetchDelete(data: any) {
  return request({
    url: "/apps/delete",
    method: "post",
    data: data,
  });
}

/**
 * Switch app
 *
 * @param data Data
 */
export function fetchSwitch(data: any) {
  return request({
    url: "/apps/switch",
    method: "post",
    data: data,
  });
}

/**
 * Get apps list
 *
 * @param data Data
 */
export function fetchPreview() {
  return request({
    url: "/apps/perview",
    method: "post",
  });
}
