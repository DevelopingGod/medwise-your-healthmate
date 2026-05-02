#flask works on templates, thus we use the same as import
from flask import Flask, render_template, request, jsonify

from chat import get_response

app = Flask(__name__)

#Defining Routes and associated files
@app.get("/")
def index_get():
    return render_template("base.html")

#When on other part, do the following. Can change look and route if needed
@app.post("/predict")
def predict():

    
    text = request.get_json().get("message")
    #Check text valid or not
    response = get_response(text)

    #To put back to user, jsonify
    message = {"answer": response}
    return jsonify(message)



#To start the application
if __name__ =="__main__":

    app.run(debug=True)
    