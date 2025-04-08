import axios from 'axios';

import { EnvKeys } from 'src/constants/env';

const clientApi = axios.create({
  baseURL: import.meta.env[EnvKeys.VITE_BASE_URL],
});

// clientApi.interceptors.request.use(
// 	<T>(config: InternalAxiosRequestConfig<T>) => {
// 		const authToken = Cookies.get(TOKEN.AUTH_TOKEN)
// 		config.headers["authorization"] = authToken ? `Bearer ${authToken}` : null
// 		return config
// 	},
// )

export default clientApi;
