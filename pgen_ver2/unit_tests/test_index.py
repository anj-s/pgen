# Unit tests for wiki_content.py

def test_hello_world():
	print("Hello World!")


def test_home_page(test_client):

    response = test_client.get('/')
    print(response.data)
    assert response.status_code == 200
    
    # assert b"Welcome to the Flask User Management Example!" in response.data
    # assert b"Need an account?" in response.data
    # assert b"Existing user?" in response.data
