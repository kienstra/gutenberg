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
			return `Here is the last network error: \n \n${ JSON.stringify(
				this.networkErrors.pop(),
				null,
				2
			) } \n`;
		}

		return `There was no network error`;
	}
}

module.exports = new ErrorLog();
