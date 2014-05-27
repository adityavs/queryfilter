(function(){
	// Import
	var expect = require('chai').expect,
		joe = require('joe');

	var expectations = {
		"simple string parse": {
			"data": {
				"key": "name",
				"value": "Benjamin"
			},
			"string": "name:Benjamin",
			"human": "name matches Benjamin"
		},

		"inverse string parse": {
			"data": {
				"key": "name",
				"value": "Benjamin",
				"inverse": true
			},
			"string": "name:!:Benjamin",
			"human": "name does not match Benjamin"
		},

		"exact string parse": {
			"data": {
				"key": "name",
				"value": "Benjamin",
				"exact": true
			},
			"string": "name:=:Benjamin",
			"human": "name exactly matches Benjamin"
		},

		"inverse exact string parse": {
			"data": {
				"key": "name",
				"value": "Benjamin",
				"exact": true,
				"inverse": true
			},
			"string": "name:!:=:Benjamin",
			"human": "name does not exactly match Benjamin"
		},

		"between": {
			"data": {
				"key": "money",
				"value": [1,5],
				"operator": "bt"
			},
			"string": "money:bt:1:5",
			"human": "money matches between 1 and 5"
		},

		"greater than": {
			"data": {
				"key": "money",
				"value": 1,
				"operator": "gt"
			},
			"string": "money:gt:1",
			"human": "money matches greater than 1"
		},

		"less than": {
			"data": {
				"key": "money",
				"value": 1,
				"operator": "lt"
			},
			"string": "money:lt:1",
			"human": "money matches less than 1"
		},

		"address": {
			"data": {
				"key": "address",
				"value": [
					"U23 58-61 Herbert St",
					"West Ryde",
					"NSW",
					"2114",
					"Australia"
				],
				"type": "location"
			},
			"string": "address:$location:U23 58-61 Herbert St:West Ryde:NSW:2114:Australia",
			"human": "address matches U23 58-61 Herbert St, West Ryde, NSW, 2114, Australia"
		}
	};

	// Test Individual Query Filter
	joe.describe('queryfilter', function(describe,it){
		var QueryFilter = require('../').QueryFilter;
		Object.keys(expectations).forEach(function(key){
			var expectation = expectations[key];
			it(key, function(){
				var queryFilter = new QueryFilter(expectation.data);
				expect(queryFilter.toString()).to.equal(expectation.string);
				expect(queryFilter.toHumanString()).to.equal(expectation.human);
				expect(queryFilter.fromString(queryFilter.toString()).toString()).to.equal(expectation.string);
					
			});
		});
	});


	// Test Combined QueryFilters
	joe.describe('queryfilters', function(describe,it){
		var QueryFilters = require('../').QueryFilters;
		var strings = [];
		var humans = [];
		Object.keys(expectations).forEach(function(key){
			var expectation = expectations[key];
			strings.push(expectation.string);
			humans.push(expectation.human);
		});
		strings = strings.join(';');
		humans = humans.join(' and ');

		it('should be the expectations', function(){
			var queryFilters = new QueryFilters(strings);
			expect(queryFilters.toString()).to.equal(strings);
			expect(queryFilters.toHumanString()).to.equal(humans);
		});
	});
})();
