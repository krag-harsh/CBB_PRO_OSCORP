import pickle
import os
from flask import Flask,request,render_template,redirect,url_for,session,jsonify,make_response


# X_test_mean = [[7,24,50,182,0]]
breast_cancer_detector_model = pickle.load(open('breast_cancer_detector.pickle', 'rb'))
# y_pred = breast_cancer_detector_model.predict(X_test_mean)
# print(y_pred)

app = Flask(__name__)
app.config["SECRET_KEY"]="mysecretkey"
@app.route('/')
def index():
    return render_template("index.html")
@app.route('/process',methods=['POST'])
def process():
    radius=request.form['radius']
    texture=request.form['texture']
    perimeter=request.form['perimeter']
    area = request.form['area']
    concave= request.form['concave']
    print("DG")
    if(radius and texture and perimeter and area and concave):
        y_pred = breast_cancer_detector_model.predict([[radius,texture,perimeter,area,concave]])
        print(y_pred)
        return jsonify({'y_pred':y_pred})
    print("HG")
    return jsonify({'error':'missing data'})

if __name__=='__main__':
    app.run(debug=True)

