/*
 * @Description: 
 * @Author: 陈月德
 */
/*
 * @Description: 
 * @Author: 陈月德
 */
const ErrTips = {
    1: '服务异常',
    415:'登录失效，请重新登录',
    401:'登录失效，请重新登录',
}
class Request {
    request({
        url,
        data = {},
        method = 'POST',
        refresh = false
    }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method, refresh)
        })
    }
    _request(url, resolve, reject, data = {}, method = 'POST', refresh = false) {
        // const ticket ='NTgxMDEyQTYtMDIyMC1CNUM2LUM0OEQtMDdCOERBNTAwM0I1'
        const ticket = getApp().globalData.userInfo.ticket
        if (!refresh) {
            wx.showLoading({
                title: '加载中...',
                mask: 'false'
            });
        }
        wx.request({
            url: url + '?ticket=' + ticket,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
            },
            success: res => {
                if (!refresh) {
                    wx.hideLoading()
                }
                const code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    reject()
                    this._showErr(code)
                }
            },
            fail: err => {
                reject()
                this._showErr(res.statusCode)
            }
        })
    }
    _showErr(code) {
        wx.showModal({
            title: code,
            content: ErrTips[code]?ErrTips[code]:ErrTips[1],
            showCancel: false
        })
    }
}
export {
    Request
}