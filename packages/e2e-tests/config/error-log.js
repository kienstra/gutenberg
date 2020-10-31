module.exports = class ErrorLog {
	static screenshot = '';
	static dom = '';
	static networkErrors = [];

	static setScreenshot( screenshot ) {
		this.screenshot = screenshot;
	}

	static setDom( dom ) {
		this.dom = dom;
	}

	static getDom() {
		return this.dom;
	}

	static addNetworkError( error ) {
		this.networkErrors.push( error );
	}

	static getConsoleMessage() {
		return `Here is a screenshot of when the test failed: \n \ndata:image/jpeg;base64,${ this.screenshot } \n`;
	}

	static getNetworkErrors() {
		if ( this.networkErrors.length ) {
			return `Here is the last network error: \n \n${ this.networkErrors.pop() } \n`;
		} else {
			return `There was no network error`;
		}
	}
};
