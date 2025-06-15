sap.ui.define([], function () {
	   "use strict";

	   return {
		     numberUnit: function (sValue) {
			// …
		     },
		     /**
		     * Defines a value state based on the price
		     *
		     * @public
		     * @param {number} iPrice the price of a post
		     * @returns {string} sValue the state for the price
		     */
		     priceState: function (iPrice) {
                console.log(iPrice)
			   if (iPrice < '50') {
				  return "Success";
			   } else if (iPrice >= '50' && iPrice < '250') {
				  return "None";
			   } else if (iPrice >= '250' && iPrice < '2000') {
				  return "Warning";
			   } else {
				  return "Error";
			   }
		  }
	};
});