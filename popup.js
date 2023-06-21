// Demo Data
demo_data = {
    "places": ["Italy", "Australia", "India", "Norway"],
    "animals": ["elephant", "lion", "orca", "panda"],
    "colors": ["teal", "pink", "blue", "green"],
    "profs": ["doctor", "astronaut", "racer", "golfer"]
}

// API key
var palm_api_key = ""

data_prompts = {
    "places": "Give me the top 5 most popular cities in a javascript list delimited by square brackets.",
    "animals": "Give me the top 5 most popular animals in a javascript list delimited by square brackets.",
    "colors": "Give me the top 5 most popular colors in a javascript list delimited by square brackets.",
    "profs": "Give me the top 5 most popular professions in a javascript list delimited by square brackets.",
}

adj_data_prompts = {
    "places": "Return only the name of the country in which _places_ is in",
    "animals": "Return 3 adjectives for describing a _animals_ which are less than 6 characters long where the result is a list of strings",
    "colors": "Return 3 synonyms for describing the color _colors_ where the adjectives are less than 6 characters long where the result is a list of strings",
}

palm_data = {}

special_chars = ['!', '@', '#', '$', '&']

var choices = [];
var cur_topic = "None";
var result = "None"


var requires_caps = false;
var requires_special_chars = false;
var requires_numbers = false;
var caps_cbox_id = document.getElementById("caps_cbox");
var special_chars_cbox_id = document.getElementById("special_chars_cbox");
var numbers_id = document.getElementById("numbers_cbox");


// Display only the form that we use for capturing the API key.
document.getElementById("start_div").style.display = "none"
document.getElementById("cboxes_div").style.display = "none"
document.getElementById("pwd_reqs_div").style.display = "none"
document.getElementById("pwd_actions_div").style.display = "none"
document.getElementById("pwd_result_div").style.display = "none"

function setup(){
    
    // Send out PaLM API requests
    all_topics = Object.keys(data_prompts)
    for(var i=0; i<all_topics.length; i++){
        palm_prompts(all_topics[i], data_prompts[all_topics[i]])
    }
}

function populate_popup(){
    document.getElementById("start_div").style.display = "block"

    all_topics = Object.keys(palm_data)
    for(var i=0; i<all_topics.length; i++){
        const cur_data = palm_data[all_topics[i]];
        var cur_div = document.getElementById(all_topics[i] + "_cboxes");
        for (var j = 0; j < cur_data.length; j++) {
            var checkBox = document.createElement("input");
            var label = document.createElement("label");
            var br_elem = document.createElement("br");
            // cur_div.appendChild(br_elem)
            checkBox.type = "checkbox";
            checkBox.value = cur_data[j];
            checkBox.id = cur_data[j] + "_id";
            label.id = cur_data[j] + "_label__id"
            checkBox.addEventListener("click", handleTopic);
            cur_div.appendChild(checkBox);
            cur_div.appendChild(label);
            label.style.fontSize = "25px";
            label.appendChild(document.createTextNode(" " + cur_data[j]));
            // cur_div.appendChild(br_elem)

        }
    }
    
    reset_all()

}

function reset_all(){
    document.getElementById("start_div").style.display = "block"
    document.getElementById("pwd_form").style.display = "block"

    document.getElementById("pwd_reqs_div").style.display = "none"
    document.getElementById("pwd_actions_div").style.display = "none"
    document.getElementById("pwd_result_div").style.display = "none"


    document.getElementById("special_chars_cbox").checked = false
    document.getElementById("caps_cbox").checked = false

    document.getElementById("cboxes_div").style.display = "block"
    setup_topic_listeners("places")
    setup_topic_listeners("animals")
    setup_topic_listeners("profs")
    setup_topic_listeners("colors")

    all_topics = Object.keys(palm_data)
    for(var i=0; i<all_topics.length; i++){
        cur_data = palm_data[all_topics[i]]
        for(var j=0; j<cur_data.length; j++){
            document.getElementById(cur_data[j]+'_id').checked = false
        }
        document.getElementById(all_topics[i] + "_cboxes").style.display = "none"
        document.getElementById(all_topics[i] + "_btn").style.display = "block"
    }

    cur_topic = ""
    requires_caps = false
    requires_special_chars = false

    requires_numbers.checked = false
    requires_special_chars.checked = false
    requires_caps.checked = false

}

function setup_topic_listeners(topic) {
    const cur_data = palm_data[topic];
    const cur_btn = document.getElementById(topic + "_btn")
    all_topics = Object.keys(palm_data)

    cur_btn.addEventListener('click', () => {
        cur_topic = topic;
        for(var i=0; i<all_topics.length; i++){
            // We can remove this and just set "start_div" to none.
            document.getElementById(all_topics[i] + "_btn").style.display = "none"
        }
        document.getElementById(topic + "_cboxes").style.display = "block"
        document.getElementById("reset_btn").style.display = "block"
        document.getElementById("get_btn").style.display = "block"
        document.getElementById("pwd_reqs_div").style.display = "block"
        document.getElementById("pwd_actions_div").style.display = "block"
    })
}


api_btn = document.getElementById("api_btn")
api_btn.addEventListener('click', () => {
    let api_key_div = document.getElementById("api_key_div")
    api_key_div.style.display = "none"
    palm_api_key = document.getElementById("api_key_txt").value
    setup()
})

reset_btn = document.getElementById("reset_btn")
reset_btn.addEventListener('click', () => {
    reset_all()
})

get_btn = document.getElementById("get_btn")
get_btn.addEventListener('click', () => {
    additional_prompt = false
    if (Object.keys(adj_data_prompts).includes(cur_topic)){
        additional_prompt = true

        adj_prompt = adj_data_prompts[cur_topic]
        adj_prompt = adj_prompt.replace("_" + cur_topic + "_", result)
        palm_adj_prompts(adj_prompt, result, cur_topic)
    } else {
        prepare_pwd_result(result)
    }
    document.getElementById("start_div").style.display = "none"
    document.getElementById("cboxes_div").style.display = "none"
    document.getElementById("pwd_reqs_div").style.display = "none"
    document.getElementById("get_btn").style.display = "none"

    document.getElementById("reset_btn").style.display = "block"
})

function prepare_pwd_result(result){
    if (requires_caps){
        result = result[0].toUpperCase() + result.substring(1)
    }

    if (requires_special_chars){
        index = Math.floor(Math.random() * special_chars.length)
        result += special_chars[index]
    }

    if(requires_numbers){
        num = Math.floor(Math.random() * 100)
        result += num.toString()
    }

    let pwd_div = document.getElementById("pwd_div")
    pwd_div.style.display = "block"
    pwd_div.innerHTML = result
    document.getElementById("pwd_result_div").style.display = "block"
    // TODO(anj): Add more style element
    // TODO(anj): Display multiple pwd options
}


caps_cbox_id.addEventListener('change', () => {
    if (caps_cbox_id.checked){
        requires_caps = true
    }
})

special_chars_cbox_id.addEventListener('change', () => {
    if (special_chars_cbox_id.checked){
        requires_special_chars = true
    }
})

numbers_id.addEventListener('change', () => {
    if (numbers_id.checked){
        requires_numbers = true
    }
})

function handleTopic(e) {
    result = e.target.value
    
}

// Palm API
function palm_prompts(topic, prompt){
    fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=' + palm_api_key, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: '{ "prompt": { "text": \"' +  prompt  + '\"} }',
    }).then(response => {
        if (response.ok) {
            response.json().then(json => {
                var palm_resp = json['candidates'][0]['output'];
                palm_data[topic] = parse_palm_resp(palm_resp)

                if (Object.keys(palm_data).length == 4){
                    populate_popup()
                }


            });
        }
        // Error message for an incorrect request
    });
  }

  function palm_adj_prompts(prompt, result, cur_topic){
    fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=' + palm_api_key, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: '{ "prompt": { "text": \"' +  prompt  + '\"} }',
    }).then(response => {
        if (response.ok) {
            response.json().then(json => {
                var palm_resp = json['candidates'][0]['output'];
                if (cur_topic == "places"){
                    // you don't need to parse a list since it is a single string
                    palm_resp = palm_resp.replace(" ", "_")
                    palm_resp = palm_resp.toLowerCase()
                    palm_resp = result + '_' + palm_resp
                    prepare_pwd_result(palm_resp)
                }else{
                    potential_responses = parse_palm_resp(palm_resp)
                    index = Math.floor(Math.random() * potential_responses.length)
                    prepare_pwd_result(result + '_' + potential_responses[index])
                }
            });
        }
        // Error message for an incorrect request
    });
  }

function parse_palm_resp(resp){
    resp = resp.replaceAll('```', '')
    resp = resp.replaceAll('\n', '')
    resp = resp.replaceAll('\'', '')
    resp = resp.replaceAll(' ', '')
    resp = resp.replace('javascript', '')
    resp = resp.split('[')
    resp = resp[1].split(']')
    resp = resp[0]
    resp = resp.split(',')
    data = []

    // console.log("resp length " + resp.length)
    for(var i=0; i<resp.length; i++){
        value = "test"
        try {
            value = JSON.parse(resp[i])
        } catch (error) {
            value = String(resp[i])
        }
        data.push(value.toLowerCase())
    }
    return data
}