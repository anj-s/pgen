
![pgen_icon](https://github.com/anj-s/pgen/assets/32556631/8e4241b0-0143-4484-8e93-0dde2d6a28d3)

# PGen - an LLM based password generator

PGen is a chrome extension that can be used to generate passwords using LLMs as a knowledge base. Users can use an existing LLM API key, identify topics that they gravitate towards and use the extension to suggest potential passwords. 
There were two main goals that the application is set to accomplish:

1. Enable seamless login experience
2. Make it easy to remember personalized passwords

<img width="1107" alt="image" src="https://github.com/anj-s/pgen/assets/32556631/040b2383-1f38-4bb0-b933-8b2626368978">

<img width="160" height="250" alt="image" src="https://github.com/anj-s/pgen/assets/32556631/f3a14ce9-a566-45cb-b9ca-73dd2471bcba">

<img width="250" height="250" alt="image" src="https://github.com/anj-s/pgen/assets/32556631/20195073-0d6c-4148-a299-bcbaff7fc755">


To play with this chrome extension, you need to:
1. Get a PaLM API key
2. Clone the GitHub repo
3. Open `chrome://extensions/` and click on the "Load unpacked" button.
4. Navigate and select the `pgen_chrome_ext` folder.

Currently the PGen has only support for the PaLM LLM model which means users will need an API key. This can be generated using instructions [here](https://developers.generativeai.google/tutorials/setup). 

Note: This is a prototype of an idea and does not have any production level guarantees for LLM bias and safety responses. Bugs are expected and filing issues or PRs are encouraged.
