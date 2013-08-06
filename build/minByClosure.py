#!/usr/bin/python2.4

import httplib, urllib, sys, json

# Define the parameters for the POST request and encode them in
# a URL-safe format.

f = open('../src/deepIndexOf.js', 'r')

params = urllib.urlencode([
    ('js_code', f.read()),
	('compilation_level', 'ADVANCED_OPTIMIZATIONS'),
#	('compilation_level', 'SIMPLE_OPTIMIZATIONS'),
#	('compilation_level', 'WHITESPACE_ONLY'),    
    ('output_format', 'json'),
    ('output_info', 'compiled_code'),
    ('output_info', 'warnings'),
    ('output_info', 'errors'),
    ('output_info', 'statistics'),
#	('formatting', 'pretty_print')
  ])

# Always use the following value for the Content-type header.
headers = { "Content-type": "application/x-www-form-urlencoded" }
conn = httplib.HTTPConnection('closure-compiler.appspot.com')
conn.request('POST', '/compile', params, headers)
response = conn.getresponse()
data = json.load(response)
try:
	data["errors"]
except:
	try:
		data["warnings"]
	except:
		try:
			data["compiledCode"]
			of = open('../src/deepIndexOf.min.js', 'w')
			of.write(data["compiledCode"])
		except:
			print "no code"

		try:
			print data["statistics"]
		except:
			print "no statistics"
	else:
		print data["warnings"]
else:
	print data["errors"]

f.close()
of.close()
conn.close()
