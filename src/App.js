import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState(''); // 入力した数式
  const [result, setResult] = useState(''); // 計算結果

  // 数字や演算子がクリックされたとき
  const handleClick = (value) => {
    // prev → 今までの入力内容（前の状態）
    setInput((prev) => prev + value);
  };

  // クリアボタン処理
  const handleClear = () => {
    setInput('');
    setResult('');
  };

  // 計算処理
  const handleCalculate = () => {
    try {
      // 入力された文字列の「×」を「*」に、「÷」を「/」に変換
      const formattedInput = input.replace(/×/g, '*').replace(/÷/g, '/');
      // eval() → 入力された文字列をそのまま計算 する関数
      const result = eval(formattedInput);
      // React では、画面に表示するものは 文字列 (string) でなければならないことが多い
      // toString() は、数字 → 文字列 に変換する関数
      setResult(result.toString());
    } catch (error) {
      setResult('エラー');
    }
  };

  return (
    <div className="calculator">
      <h1>電卓アプリ</h1>

      {/* ディスプレイ部分 */}
      <div className="display">
        {/* result || input || '0' → 結果 → 入力 → 0 の順で表示 */}
        {result || input || '0'}
      </div>

      {/* ボタン部分 */}
      <div className="buttons">
      {/* map() は、配列の要素を 1 つずつ取り出して、何かしらの処理をする関数 */}
        {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', 'C', '=', '+'].map((item) => (
          <button
          // key は、React が要素を区別するための特別なプロパティ
            key={item}
            // クリックされたときの処理
            onClick={() => {
              // item が 'C' なら、クリアボタン処理を実行
              if (item === 'C') {
                handleClear();
                // item が '=' なら、計算処理を実行
              } else if (item === '=') {
                handleCalculate();
                // それ以外の場合は、数値や演算子がクリックされたときの処理を実行
              } else {
                handleClick(item);
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
