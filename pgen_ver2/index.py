from flask import Flask, jsonify, request, Blueprint, render_template, redirect, url_for

from app import pwd_phrases
import json
import ast
import nltk

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def get_topics():

	if request.method == 'POST':
		req = request.form.to_dict(flat=True)

		selected_topics = request.form.getlist('mymultiselect')
		print(request.form.get('vehicle1'))
		user_topic = req.get('my_choice')
		if 'topic' not in user_topic:
			selected_topics.append(user_topic)
		pwd_list = pwd_phrases.get_pwd_choices(selected_topics)
		if len(pwd_list) == 0:
			error = "Invalid topic chosen. Please choose another topic or try the Surprise Me! option."
			return render_template('index.html', my_title='get_topics', error=error)
		else:
			return redirect(url_for('.display', pwd_list=pwd_list, error=None))

	# TODO(anjs): Can we get rid of this?
	nltk.download('popular')

	return render_template('index.html', my_title='get_topics', error=None)

@app.route('/display/<pwd_list>', methods=['GET', 'POST'])
def display(pwd_list):

	response = ast.literal_eval(pwd_list)
	return render_template('display.html', pwd_list=response)

@app.route('/pwd')
def get_pwd():
	topic = request.args.get('topic')
	out = pwd_phrases.get_pwd_choices(topic)
	print(out)
	return jsonify(out)


if __name__ == '__main__':
		# This is used when running locally. Gunicorn is used to run the
		# application on Google App Engine. See entrypoint in app.yaml.
		app.run(host='127.0.0.1', port=8080, debug=True)