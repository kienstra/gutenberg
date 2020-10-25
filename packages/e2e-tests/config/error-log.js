class ErrorLog {
	constructor() {
		this.screenshot = '';
		this.dom = '';
		this.networkErrors = [];
	}

	setScreenshot( screenshot ) {
		this.screenshot = screenshot;
	}

	setDom( dom ) {
		this.dom = dom;
	}

	getDom() {
		return this.dom;
	}

	addNetworkError( error ) {
		this.networkErrors.push( error );
	}

	getConsoleMessage() {
		return `Here is a screenshot of when the test failed: \n \ndata:image/jpeg;base64,${ this.screenshot } \n`;
	}

	getNetworkErrors() {
		if ( this.networkErrors.length ) {
			return `Here is the last network error: \n \n${ this.networkErrors.pop() } \n`;
		}
	}
}

module.exports = new ErrorLog();
