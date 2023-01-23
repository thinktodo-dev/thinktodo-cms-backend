/**
 * This function format data json
 * @param message
 * @param data
 */
export function getDataSuccess(data, message = null) {
  return {
    code: 1,
    message,
    data,
    error: null,
  };
}

/**
 * This function format data json
 * @param message
 * @param data
 * @param result_code
 */
export function getDataError(error_code: string, message = null, data) {
  return {
    code: 0,
    message,
    data,
    error: error_code,
  };
}

/**
 * This function is used to return result with pagination
 * @param {String} message
 * @param {Array} data
 * @param {Number} count
 * @param {Boolean} load_more
 * @returns Object
 */
export function getPaginationData(message, data, count, load_more) {
  const result = getDataSuccess(message, null);
  // Format for pagination
  result.data = {
    count,
    results: data,
    load_more,
  };

  return result;
}

/**
 * This function is used to return pagination results list with current_page, next_page and total_page
 * @param {String} message
 * @param {Array} data
 * @param {Number} count
 * @param {Object} options
 * Example options: {
 *     current_page: 1
 *     next_page: 2
 *     total_page: 5
 * }
 * @returns Object
 */
export function getPaginationDataWithLimitAndOffset(
  message,
  data,
  count,
  options
) {
  const result = getDataSuccess(message, null);
  result.data = {
    count,
    results: data,
    current_page: options.current_page,
    next_page: options.next_page,
    total_page: options.total_page,
  };

  return result;
}

export function pickExist(obj = {}, props = []) {
  const results = {};
  for (let i = 0; i < props.length; i++) {
    if (obj.hasOwnProperty(props[i])) {
      results[props[i]] = obj[props[i]];
    }
  }

  return results;
}
