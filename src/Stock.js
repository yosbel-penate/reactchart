import React, { Component } from 'react'
import Plot from 'react-plotly.js';

export class Stock extends Component {
    constructor(props){
        super(props);
        this.state={
            stockChartXValues:[],
            stockChartYValues:[],
        }
    }
    componentDidMount(){
        this.fetchStock();
    }
    fetchStock(){
        let pointerToThis=this;
        console.log(pointerToThis);
        let StockSymbol='FB';
        const API_KEY='DH1JL57PC0S03TQA';
        let API_Call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`
        //let API_Call='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo'
        let stockChartXValuesFunction=[];
        let stockChartYValuesFunction=[];
        fetch(API_Call)
        .then(
            function(response){
                return response.json();
            }
        )
        .then(
            function(data){
                    console.log(data);

                    for (const key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open'])
                    }
                    pointerToThis.setState({
                        stockChartXValues:stockChartXValuesFunction,
                        stockChartYValues:stockChartYValuesFunction
                    })
                }
        )
    }
    render() {
        return (
            <div>
                <Plot
                    data={[
                    {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    ]}
                    layout={ {width: 665, height: 450, title: 'Stock Market'} }
                />
            </div>
        )
    }
}

export default Stock
