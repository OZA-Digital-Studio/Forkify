import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// Functions that we re-use over and over in the application
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // telling the API that the data we are sending is in json
          },
          body: JSON.stringify(uploadData), // transforming our data into a json format
        })
      : fetch(url);

    const res = await Promise.race([fecthPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
