import { useState } from 'react';

export default function useFetch() {
  const [result, setResult] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  async function getAsJson({ url }) {
    try {
      const response = await fetch(url);

      setResult(await response.json());
    } catch (err) {
      setFetchError(err);
    }
  }
  async function postAsJson({ url, init }) {
    try {
      const resp = await fetch(url, init);
      setResult(await resp.json());
    } catch (err) {
      setFetchError(err);
    }
  }

  return { getAsJson, postAsJson, result, fetchError };
}
