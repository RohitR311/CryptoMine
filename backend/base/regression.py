import numpy as np
import pandas as pd
from datetime import datetime

def regression(file_n, date_p, open_p, close_p, volume):
    fields = ('Year', 'Month', 'Day', 'Open', 'Close', 'Rise/Fall', 'Volume', 'Marketcap')
    dataset = pd.read_csv(file_n, usecols=fields)

    X = dataset.iloc[:, :-1].values
    Y = dataset.iloc[:, -1].values  

    from sklearn.ensemble import RandomForestRegressor
    regressor = RandomForestRegressor(n_estimators = 5, random_state = 0)
    regressor.fit(X, Y)

    if open_p > close_p:
        rise_fall = 0
    else:
        rise_fall = 1

    dt = datetime.strptime(date_p, "%Y-%m-%d")

    list1 = [[dt.year, dt.month, dt.day, open_p, close_p, rise_fall, volume]]
    example = np.array(list1)

    perfect_pred = regressor.predict(example)

    return perfect_pred
