![export](https://github.com/anj-s/pgen/assets/32556631/2cb17eed-44a3-4928-abf6-2a11521d56fb)

# PGen - an LLM based password generator

PGen is a chrome extension that can be used to generate passwords using LLMs as a knowledge base. Users can use an existing LLM API key, identify topics that they gravitate towards and use the extension to suggest potential passwords. 
There were two main goals that the application is set to accomplish:

1. Enable seamless login experience
2. Make it easy to remember personalized passwords

<img width="1107" alt="image" src="https://github.com/anj-s/pgen/assets/32556631/a9eabdcd-a530-4f26-a7bf-8d1b0b95a679">

<img width="400" height="250" alt="image" src="https://github.com/anj-s/pgen/assets/32556631/747946a1-e640-4c06-970a-5e64f3957d04">

<img width="250" height="250" alt="image" src="https://github.com/anj-s/pgen/assets/32556631/0666dd12-cf60-4b09-9110-35f5c5885602">


To play with this chrome extension, you need to:
1. Get a PaLM API key
2. Clone the GitHub repo
3. Open `chrome://extensions/` and click on the "Load unpacked" button.
4. Navigate and select the `pgen_chrome_ext` folder.

Currently the PGen has only support for the PaLM LLM model which means users will need an API key. This can be generated using instructions [here](https://developers.generativeai.google/tutorials/setup). 

Note: This is a prototype of an idea and does not have any production level guarantees for LLM bias and safety responses. Bugs are expected and filing issues or PRs are encouraged.
