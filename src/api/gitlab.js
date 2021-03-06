const API_URL = 'https://gitlab.com/api/v3'

const addUrlPrefix = (url) => `${API_URL}/${url}`
const getPrivateToken = (accessToken) => `?private_token=${accessToken}`
const getUrlParams = (params = {}) => {
	let urlParams = ''

	if (params.per_page)
		urlParams = `&per_page=${params.per_page}`

	if (params.search)
		urlParams += `&search=${params.search}`

	return urlParams
}
const createRequestUrl = ({pathname, accessToken, params}) => (
	addUrlPrefix(pathname) + getPrivateToken(accessToken) + getUrlParams(params)
)

class GitlabAPI {
	static getUser({accessToken}) {
		return fetch(createRequestUrl({pathname: 'user', accessToken}))
      .then(response => {
				if (!response.ok)
					throw ({status: response.status, statusText: response.statusText})

				return response.json()
			})
	}

	static fetchProjects({accessToken}) {
		return fetch(createRequestUrl({
			accessToken,
			pathname: 'projects',
			params: {per_page: 10}
		}))
      .then(response => {
				if (!response.ok)
					throw ({status: response.status, statusText: response.statusText})

				return response.json()
			})
	}

	static searchProjects({accessToken, value}) {
		return fetch(createRequestUrl({
			accessToken,
			pathname: 'projects',
			params: {per_page: 10, search: value}
		}))
      .then(response => {
				if (!response.ok)
					throw ({status: response.status, statusText: response.statusText})

				return response.json()
			})
	}
}

export default GitlabAPI
