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
		if ( this.networkErrors.length > 1 ) {
			return `💡 Here are the network errors, starting with the latest: \n \n${ JSON.stringify(
				this.networkErrors.reverse(),
				null,
				2
			) } \n`;
		}

		if ( this.networkErrors.length === 1 ) {
			return `💡 There was a network error that might be related: \n \n${ JSON.stringify(
				this.networkErrors,
				null,
				2
			) } \n`;
		}
		return `There was no network error`;
	}
}

module.exports = new ErrorLog();
