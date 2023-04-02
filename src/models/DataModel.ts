export interface DataModel {
  "Meta Data": Object;
  "Time Series (15min)": Object;
}

export interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': Date;
  '4. Output Size': string;
  '5. Time Zone': string;
}

export interface TimeSeriesDaily {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}
