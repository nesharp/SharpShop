import { instance } from '../../api/api.interceptor';
import { saveToStorage } from './auth.helper';
import axios from 'axios';
import Cookies from 'js-cookie';



import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface';



import { getContentType } from '@/api/api.helper';


const server_url = 'http://localhost:4200/api'

class AuthSevice {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await instance<IAuthResponse>({
			url:`/auth/${type}`,
			method: 'POST',
			data
		})
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response.data
	}
	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axios.post<string, { data: IAuthResponse }>(
			server_url + '/auth/login/access-token',
            { refreshToken },
            { headers: getContentType() }
		)
        

        if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	}
}
export default new AuthSevice()