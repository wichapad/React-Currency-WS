import money from "./img/money.png"
import './App.css';
import CurrencyComponent from "./component/CurrencyComponent";
import { useEffect, useState } from 'react'

function App() {


  const [currencyRates, setCurrencyRates] = useState([]) // สร้าง state มารับค่า

  const [fromCurrency, setFromCurrency] = useState("USD") //กำหนดค่า state สำหรับ สกุลเงินต้นทาง
  const [toCurrency, setToCurrency] = useState("THB") //กำหนดค่า state สำหรับ สกุลเงินปลายทาง

  const [amount, setAmount] = useState(1) //จำนวนเงินที่ป้อน
  const [exChangeRate, setExchangeRate] = useState(0) //อัตราการแลกเปลี่ยน

  const [checkFromCurrency, setCheckFromCurrency] = useState(true) //เช็คว่าตัวเลขที่ป้อนมาจากสกุลเงินต้นทางหรือไม่

  let fromAmount, toAmount //ทำการเก็บค่าตัวเลขที่ส่งมาจาก input ช่อง1 และ 2

  if (checkFromCurrency) {
    fromAmount = amount //input สกุลเงินต้นทาง 
    toAmount = (amount * exChangeRate).toFixed(2) //แปลงจำนวนเงินต้นทาง เป็นสกุลเงินปลายทาง
  } else {
    toAmount = amount //input สกุลเงินปลายทาง 
    fromAmount = (amount / exChangeRate).toFixed(2) //แปลงจำนวนเงินปลายทาง เป็นสกุลเงินต้นทาง
  }


  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}` //ดึง Api มาใ้ช้
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCurrencyRates([...Object.keys(data.rates)])
        setExchangeRate(data.rates[toCurrency])
      }) // นำค่าที่ดึงมาจาก Api เก็บลงใน state และ prop state ไปทำงานที่ currencyComponent
  }, [fromCurrency, toCurrency]) //useEffect จะให้เกิดการทำงานก็ต่อเมื่อมีการเปลี่ยนแปลงค่าใน fromCurrency

  const amountFromCurrency = (e) => { // สร้าง function สกุลเงินต้นทาง
    setAmount(e.target.value)
    setCheckFromCurrency(true) // เช็คว่าค่านี้มาจากสกุลเงินต้นทาง เพราะมีค่าเป็น true
  }
  const amountToCurrency = (e) => { // สร้าง function สกุลเงินปลายทาง
    setAmount(e.target.value)
    setCheckFromCurrency(false) // เช็คว่าค่านี้มาจากสกุลเงินปลายทาง เพราะมีค่าเป็น false
  }

  return (
    <div>
      <img className="money_img" src={money} alt="logo" />
      <h1>Currency Converter API</h1>
      <div className="container">
        <CurrencyComponent
          currencyRates={currencyRates}
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={amountFromCurrency}
        />
        <div className="equal"> = </div>
        <CurrencyComponent
          currencyRates={currencyRates}
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
