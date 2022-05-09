from collections import defaultdict

import pandas as pd

def get_csv_data():
    return pd.read_csv('../weather_and_crime.csv')

def get_value_counts_table(df, col_name):
    count_dict = defaultdict(int)

    weather_dict = defaultdict(list)
    def update_count_dict(r):
        #filter out non-serious crimes
        if(r["OFFENSE_CODE"] < 3000):
            count_dict[r[col_name]] += 1

            if r[col_name] not in weather_dict:
                weather_dict[r[col_name]] = [r["Avg_Temp"], r["Min_Temp"], r["Max_Temp"]]

    df.apply(lambda x: update_count_dict(x), axis=1)
    rows = [[e, count_dict[e], weather_dict[e][0], weather_dict[e][1], weather_dict[e][2]] for e in count_dict]
    return pd.DataFrame(rows, columns=[col_name, "count", "avg_temp", "min_temp", "max_temp"])

def count_crimes_per_day(data):
    counts = get_value_counts_table(data, "OCCURRED_ON_DATE")
    counts.to_csv('../crimes_per_day.csv', index=False)


if __name__ == '__main__':
    csv_data = get_csv_data()
    count_crimes_per_day(csv_data)

