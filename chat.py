import random
import json

import torch

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

#Context-manager that changes the selected device. That is why can be multi-platform
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"

#Binary generated file is loaded
data = torch.load(FILE)

#Find data from binary file
input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

#neuralNet is a function that will determine number of computations required to transform inputs into outputs
model = NeuralNet(input_size, hidden_size, output_size).to(device)

#Linking state and model
model.load_state_dict(model_state)

#Evaluate the gained computations
model.eval()

bot_name = "MedWise"

#Taking and processing query from the user.
#This is passed to app.py for further computation
def get_response(msg):
    sentence = tokenize(msg)
    #Taking in all the words typed by user
    X = bag_of_words(sentence, all_words)

    #Structurising as per processing requirements
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    #Below max returns the best output
    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    # Below function i.e. softmax will be acting for data filtration as it takes best values from [0, 1]
    probs = torch.softmax(output, dim=1) 

    #Then generated item of softmax is further passed in
    prob = probs[0][predicted.item()]

    #The problem query has to be greater than the set value else user may enter gibberish
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    
    return "I do not understand..."


#Below is the availability for conversating on terminal
if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        # sentence = "do you use credit cards?"
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        print(resp)

