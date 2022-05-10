import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPRegressor
# from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score
from numpy import mean
from numpy import std
import pickle
import joblib

TEST_SIZE = 0.3


def get_data():
    return pd.read_csv("../crimes_per_day.csv")


def get_trained_model(data):
    ohe = OneHotEncoder(handle_unknown='ignore')

    feature_names = [e for e in data.columns if e != "count" and e != "OCCURRED_ON_DATE"]
    print(feature_names)

    train_df, test_df = train_test_split(data, test_size=TEST_SIZE)

    model = MLPRegressor(random_state=0, activation="relu", learning_rate="adaptive",
                         learning_rate_init=0.01, alpha=0.01)

    # linear regressor was worse
    # model = LinearRegression()
    # with one hot encoding
    # model.fit(ohe.fit_transform(train_df[feature_names]), train_df["count"])

    # without one hot encoding
    print(train_df)

    # Save model for interactive portion
    model.fit(train_df[feature_names], train_df["count"])
    pickle.dump(model, open("MLPRegressorModel", 'wb'))

    return model, ohe, train_df, test_df, feature_names


def predict_for_interactive(min_temp, max_temp):
    loaded_model = pickle.load(open("MLPRegressorModel", 'rb'))
    arr = np.reshape([(min_temp + max_temp) / 2.0, min_temp, max_temp], (1, -1))
    y_pred = loaded_model.predict(arr)
    print(y_pred)
    return y_pred


if __name__ == '__main__':
    #data = get_data()
    #model, ohe, train_df, test_df, feature_names = get_trained_model(data)