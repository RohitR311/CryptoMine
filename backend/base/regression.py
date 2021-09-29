import numpy as np
import pandas as pd
from datetime import datetime

def regression(file_n, date_p, open_p, close_p, volume):
    fields = ('Date', 'Open', 'Close', 'Volume', 'Marketcap')
    dataset = pd.read_csv(file_n, usecols=fields)

    for index, date in dataset["Date"].iteritems():
        dataset["Date"].at[index] = datetime.strptime(date[:10], "%Y-%m-%d")

    dataset['Date'] = pd.to_datetime(dataset['Date'], 
        format = '%Y-%m-%d %H:%M:%S', 
        errors = 'coerce')

    dataset['Rise/Fall'] = np.random.randint(len(dataset['Date']))

    for index, item in dataset.iterrows():
        if item['Open'] > item['Close']:
            dataset['Rise/Fall'].at[index] = 0
        else:
            dataset['Rise/Fall'].at[index] = 1

    dataset.insert(1, 'Year', dataset["Date"].dt.year)
    dataset.insert(2, 'Month', dataset["Date"].dt.month)
    dataset.insert(3, 'Day', dataset["Date"].dt.day)

    Rise_Fall = dataset.pop('Rise/Fall')
    dataset.insert(6, 'Rise/Fall', Rise_Fall)

    dataset = dataset.drop(
        ['Date'], 
        axis=1)

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
