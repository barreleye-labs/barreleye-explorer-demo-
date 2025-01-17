import axios, { AxiosResponse } from 'axios';

type Fetcher = <T>(url: string) => Promise<T>;

const fetcher: Fetcher = async (url) => {
  try {
    console.log(url);
    const response: AxiosResponse<{ data: any }> = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error);
    throw error;
  }
};

export { fetcher };
