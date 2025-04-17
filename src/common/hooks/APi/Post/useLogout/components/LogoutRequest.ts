import axios from "axios";

import { baseUrl } from "../../..";

export const logoutRequest = async (
  url: string,
  token: string,
): Promise<void> => {
  await axios.post(
    `${baseUrl}${url}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
