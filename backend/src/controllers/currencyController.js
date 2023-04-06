const { Convert } = require("easy-currencies");
const fetch = require("node-fetch")
const cheerio = require("cheerio")
const axios = require("axios")




async function fetchExchangeRates(from, to,amount) {
    const sources = [
      { url: 'https://www.x-rates.com/calculator', selector: '#content > div:nth-child(1) > div > div.col2.pull-right.module.bottomMargin > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)', factor: 1 },
      { url: 'https://www.xe.com/currencyconverter/convert', selector: '#converterWrap > div.fieldWrap.topRow > div.colMid > div.from2Wrap > div.fromMid > input[type=number]', factor: 1 },
      { url: 'https://www.oanda.com/currency-converter/en', selector: '#quote_currency_input', factor: 1 },
      { url: 'https://www.google.com/finance', selector: '#market-data-div > div > g-card-section:nth-child(1) > div > g-card-section > div > span', factor: 100 },
    ];
  
    const promises = sources.map(async source => {
      try {
        const response = await fetch(`${source.url}/?from=${from}&/to=${to}&/amount=${amount}`);
        const html = await response.text();
        const $ = cheerio.load(html);
        const rate = $(source.selector).val() * source.factor;
        return { exchange_rate: rate, source: source.url };
      } catch (error) {
        console.error(error);
        return null;
      }
    });
  
    const results = await Promise.all(promises);
    return results.filter(result => result !== null);
  }


  async function getExchangeRate(sourceUrl, from, to) {
    try {
      const response = await axios.get(sourceUrl, {
        params: { from, to }
      });

      console.log(response)
      
      return {
        exchange_rate: parseExchangeRate(response.data),
        source: sourceUrl
      };
    } catch (error) {
      return { exchange_rate: null, source: sourceUrl };
    }
  }
  
  function parseExchangeRate(html) {
    // Parse the HTML response and extract the exchange rate.
    // The specific parsing logic will depend on the structure of the HTML on the source website.
    // This is just an example implementation.
    const regex = /Exchange Rate: ([0-9.]+)/;
    const match = regex.exec(html);
    return match ? parseFloat(match[1]) : null;
  }


const currrencyExchange=async (req,res)=>{
         try{
            let { from, to } = req.query;
            from=from.toUpperCase()
            to=to.toUpperCase()

            

            const exchangeRates = await Promise.all([
                getExchangeRate('https://www.x-rates.com', from, to),
                getExchangeRate('https://www.xe.com/currencyconverter', from, to),
                getExchangeRate('https://www.oanda.com/currency-converter', from, to),
                getExchangeRate('https://www.google.com/finance/markets/currencies', from, to)
              ]);

              res.json(exchangeRates);

            // const response = req.query
            // let {from,to,amount}=response
            // const currencyFrom = from.toUpperCase()
            // const currencyTo = to.toUpperCase()
            // amount=Number(amount)
            // let currency = {from:currencyFrom,to:currencyTo,amount}
            // const exchangeRates = await fetchExchangeRates(currencyFrom, currencyTo,amount);
            // res.json(exchangeRates)

         }catch(err){
            res.status(500).send({status:false,err:err.message})
         }
}

const convertAmount = async (req,res)=>{
    try{
        let queryParams = req.query
        let currencyFrom = queryParams.from.toUpperCase()
        let currencyTo = queryParams.to.toUpperCase()
         amount = Number(queryParams.amount)
         const exchangeRates = await fetchExchangeRates(currencyFrom, currencyTo,amount);
         console.log(exchangeRates,typeof(amount))
         const maxRate = Math.max(...exchangeRates.map(rate => rate.exchange_rate));
         const minRate = Math.min(...exchangeRates.map(rate => rate.exchange_rate));
       
         const maxValue = amount * maxRate;
         const minValue = amount * minRate;
       
         res.json({ max_value: maxValue, min_value: minValue });
    }catch(err){
        res.status(500).send({status:false,err:err.message})
    }
}
module.exports = {currrencyExchange,convertAmount}