var axios = require('axios');

module.exports = {
	// Search for recipes based on term
	searchRecipes: function(searchTerm){
		return axios.get('/api/recipes/' + searchTerm);
	}
}