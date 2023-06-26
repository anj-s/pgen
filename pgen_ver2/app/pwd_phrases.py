
import os
import requests
import nltk
import string
import shutil
from . import wiki_content


def get_pwd_choices(topics):

	topic = topics[0]
	
	# Add multithreading to allow us to pull multiple wiki files
	# 1 for each topic
	wiki_content.get_wiki_xml_file(topic)

	# Parses the downloaded wiki XML file into a text 
	wiki_content.parse_wiki_file(topic)

	# Tag sentences in the downloaded wiki page to identify potential
	# password phrases.
	pwd_list = wiki_content.get_pos_tags(topic, tags=['NN'])

	# TODO(anjs): parse tags into password phrases with user specified contraints
	# such as having a requirement of capital letters, numbers, length etc.
	
	return pwd_list

