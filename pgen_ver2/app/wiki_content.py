
import os
import requests
import nltk
import string
import shutil


# URL using which we can download any wikipedia page.
WIKI_DOWNLOAD_URL = 'https://en.wikipedia.org/wiki/Special:Export/'
# All downloaded wiki files will be in this folder.
WIKI_FILES_FOLDER = 'wiki-files'



def get_wiki_xml_file(topic):
	
	directory = os.getcwd() + '/' + WIKI_FILES_FOLDER
	topic_filename = WIKI_FILES_FOLDER + '/' + topic + '.xml'

	if not os.path.exists(directory):
		os.makedirs(directory)
	
	
	headers = {"Range": "bytes=0-500"}
	# If we haven't already downloaded the wiki file,
	# we download the wiki file. This is a bad attempt at a cache.
	if not os.path.exists(topic_filename):
		receive = requests.get(WIKI_DOWNLOAD_URL+topic, headers)

		# write the wikipedia content to an XML file.
		with open(topic_filename ,'wb') as f:
			f.write(receive.content)

def parse_wiki_file(topic):

	topic_filename = WIKI_FILES_FOLDER + '/' + topic + '.xml'
	topic_folder = WIKI_FILES_FOLDER + '/' + topic + '_wiki'
	extracted_topic_filepath = topic_folder + '/AA/wiki_00';
	extracted_topic_filepath_clean = WIKI_FILES_FOLDER + '/' + topic + '_extracted.txt';
	
	# parse the xml files downloaded from wikipedia into text format that is stored in a folder.
	if not os.path.exists(extracted_topic_filepath_clean):
		pwd_path = os.getcwd()
		cmd = 'python3 ' + pwd_path + '/WikiExtractor.py ' 
		cmd = cmd + topic_filename + ' -o ' + topic_folder
		os.system(cmd)		

		# clean the extracted wiki text to now contain no <doc> tags
		with open(extracted_topic_filepath, 'rb') as read_file, open(extracted_topic_filepath_clean, 'wb') as write_file:
			for line in read_file:
				if '<doc' in str(line) or 'doc>' in str(line):
					continue
				write_file.write(line)

		shutil.rmtree(topic_folder)


def find_top_k_tags(tag_map, top_k=5):
	sorted_map_key_tuple = sorted(tag_map.items(), key=lambda kv: kv[1], reverse=True)[:top_k]
	sorted_map_key_list = [ x[0] for x in sorted_map_key_tuple]
	sorted_map = { key:value for (key,value) in tag_map.items() if key in sorted_map_key_list}
	return list(sorted_map.keys())

def get_pos_tags(topic, tags=None):

	# Tag the sentences in the downloaded wiki page with the NLTK POS tagger.
	# We use only the "NN" tag for now but we can extend it for other tags as well.
	nn_map = {}
	with open(WIKI_FILES_FOLDER + '/' + topic + '_extracted.txt', 'rb') as read_file:
		for line in read_file:
			tokens = nltk.word_tokenize(str(line))
			# remove all words that are < than 4 characters in length
			tokens = [t for t in tokens if len(t) > 3]
			tokens = [str(t).lower().strip('\n') for t in tokens]
			tag_tuples = nltk.pos_tag(tokens)
			for tt in tag_tuples:
				# Checks if this is a word and not a number.
				if tt[0].isalpha():
					if tt[1] == 'NN':
						if tt[0] in nn_map:
							nn_map[tt[0]] += 1
						else:
							nn_map[tt[0]] = 1

	# Sort the tag_map by the most frequent tags and get the top_k most common
	# words.
	return find_top_k_tags(nn_map, top_k=5)
