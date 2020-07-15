const jsforce = require('jsforce')
const { getJWTToken } = require('salesforce-jwt-promise');

class SfConnection {
    clientId
    privateKey
    accessToken
    connection

    constructor(clientId, privateKey, instanceUrl, user) {
        this.clientId = clientId
        this.privateKey = privateKey
        this.instanceUrl = instanceUrl
        this.user = user
    }

    async getAccessToken() {
        if (this.accessToken) return this.accessToken
        this.accessToken = await this.refreshAccessToken()
        return this.accessToken
    }
    async refreshAccessToken() {
        const response = await getJWTToken({clientId: this.clientId, privateKey: this.privateKey, userName: this.user})
        this.accessToken = response.access_token
        return this.accessToken
    }

    async connect() {
        console.log('connecting to sf....')
        const conn = new jsforce.Connection();
        console.log('getting access token...')
        const accessToken = await this.getAccessToken()
        try {
            conn.initialize({
                instanceUrl: this.instanceUrl,
                accessToken: accessToken
            }); 
            return conn
        } catch (err) {
            const newAccesstoken = await this.refreshAccessToken()
            conn.initialize({
                instanceUrl: this.instanceUrl,
                accessToken: newAccesstoken
            });
            return conn
        }
    }
}

module.exports = SfConnection