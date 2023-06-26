import pytest
from flask import Flask
from pgen import index

@pytest.fixture(scope='module')
def test_client():
    # flask_app = Flask(__name__)
    # you have to have a reference to the same 
    flask_app = index.app
 
    # Flask provides a way to test your application by exposing the Werkzeug test Client
    # and handling the context locals for you.
    testing_client = flask_app.test_client()
 
    # Establish an application context before running the tests.
    ctx = flask_app.app_context()
    ctx.push()
 
    yield testing_client  # this is where the testing happens!
 
    ctx.pop()