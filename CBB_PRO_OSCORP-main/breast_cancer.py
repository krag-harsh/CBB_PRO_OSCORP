import pickle
import os
import json
from flask import Flask,request,render_template,redirect,url_for,session,jsonify,make_response


# X_test_mean = [[7,24,50,182,0]]
breast_cancer_detector_model = pickle.load(open('breast_cancer_detector.pickle', 'rb'))
# y_pred = breast_cancer_detector_model.predict(X_test_mean)
# print(y_pred)
if __name__ == '__main__':
	app = Flask(__name__)
	app.config["SECRET_KEY"]="mysecretkey"
	@app.route('/hello', methods=['GET','POST'])
	def hello():
		print ("AFGS")
		if request.method == 'POST':
			print ("Incoming")
			data = request.get_json ()
			data = json.loads(data)
			y_pred = breast_cancer_detector_model.predict ([[data["radius"], data["texture"], data["perimeter"], data["area"], data["concave"]]])
			print(y_pred[0])
			return str(y_pred[0]), 200
		else:
			print('alvndap')
	
	@app.route('/')
	def cancer():
		return render_template ("cancer.html")
		
	@app.route('/index',methods=['POST','GET'])
	def index():
		return render_template("index.html")
	
	@app.route('/process',methods=['POST'])
	def process():
		print("called")
		radius=request.form['radius']
		texture=request.form['texture']
		perimeter=request.form['perimeter']
		area = request.form['area']
		concave= request.form['concave']
		print("DG")
		if(radius and texture and perimeter and area and concave):
			y_pred = breast_cancer_detector_model.predict([[radius,texture,perimeter,area,concave]])
			print(y_pred)
			return jsonify({'y_pred': y_pred})
		print("HG")
		return jsonify({'error':'missing data'})

if __name__=='__main__':
	app.run(debug=True)

