jsdoc:
	jsdoc -c docs/conf.json README.md

jshint:
	jshint Components/*.js
	jshint Entities/*.js
	