import "./currencyComponent.css"


const CurrencyComponent = (props) => {
    const { currencyRates, selectCurrency, changeCurrency, amount, onChangeAmount } = props //ดึง props มาใช้งาน
    return (
        <div className="currency">
            <select value={selectCurrency} onChange={changeCurrency}>
                {currencyRates.map((rate) => //นำมาวน loop สร้างตัวเลือกขึ้นมา
                    <option key={rate} value={rate}>{rate}</option>
                )}
            </select>
            <input type="number"
                value={amount}
                onChange={onChangeAmount}
            />
        </div>
    )
}

export default CurrencyComponent;