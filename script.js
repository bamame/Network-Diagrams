const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const mascotEl = document.getElementById("mascot");
const keys = document.querySelectorAll(".key");

const tips = [
  "🦊 小提示：先输入数字，再选运算符哦！",
  "🐼 你真棒！每次按键都在进步！",
  "🦁 记住：除数不能是 0 哦！",
  "🐰 试试看：12 + 8 = ?",
  "🦄 运算完成后，可以继续输入新算式！",
];

let expression = "";
let showResult = false;

function safeExpression(raw) {
  if (!/^[0-9+\-*/.()\s]+$/.test(raw)) return null;
  return raw;
}

function evaluateExpression() {
  if (!expression) return;

  const validated = safeExpression(expression);
  if (!validated) {
    setMessage("🙈 这个算式不认识，换一个试试吧！");
    return;
  }

  try {
    // Use Function to evaluate only a validated math expression.
    const value = Function(`"use strict"; return (${validated})`)();

    if (!Number.isFinite(value)) {
      resultEl.textContent = "不能除以 0";
      setMessage("🦁 除数不能是 0 哦，换个数字再试试！");
      showResult = true;
      return;
    }

    const rounded = Number.isInteger(value) ? value : Number(value.toFixed(6));
    resultEl.textContent = String(rounded);
    setMessage("🎉 太厉害了，算对啦！");
    showResult = true;
  } catch {
    setMessage("😵 算式还没写完整，继续输入吧！");
  }
}

function updateDisplay() {
  expressionEl.textContent = expression || "0";
  if (!expression) {
    resultEl.textContent = "0";
    showResult = false;
  }
}

function setMessage(text) {
  mascotEl.textContent = text;
}

function randomTip() {
  return tips[Math.floor(Math.random() * tips.length)];
}

function handleNumber(value) {
  if (showResult) {
    expression = "";
    resultEl.textContent = "0";
    showResult = false;
  }

  const lastChar = expression.slice(-1);
  if (value === ".") {
    const currentNumber = expression.split(/[+\-*/]/).pop();
    if (currentNumber.includes(".")) return;
    if (!currentNumber) expression += "0";
  }

  if (lastChar === ")") return;

  expression += value;
  updateDisplay();
  setMessage(randomTip());
}

function handleOperator(operator) {
  if (!expression) return;

  if (showResult) {
    expression = resultEl.textContent;
    showResult = false;
  }

  const lastChar = expression.slice(-1);
  if (/[+\-*/]/.test(lastChar)) {
    expression = expression.slice(0, -1) + operator;
  } else {
    expression += operator;
  }

  updateDisplay();
  setMessage("✨ 很好！继续完成算式吧！");
}

function handleAction(action) {
  if (action === "clear") {
    expression = "";
    updateDisplay();
    setMessage("🧼 已清空，我们重新开始！");
  }

  if (action === "backspace") {
    if (showResult) {
      expression = "";
      showResult = false;
      resultEl.textContent = "0";
    } else {
      expression = expression.slice(0, -1);
    }

    updateDisplay();
    setMessage("✏️ 删掉一个字符啦！");
  }

  if (action === "equals") {
    evaluateExpression();
  }
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.dataset.value;
    const action = key.dataset.action;

    if (value !== undefined) {
      if (/[0-9.]/.test(value)) {
        handleNumber(value);
      } else {
        handleOperator(value);
      }
    }

    if (action) {
      handleAction(action);
    }
  });
});

window.addEventListener("keydown", (event) => {
  const { key } = event;

  if (/^[0-9]$/.test(key) || key === ".") {
    handleNumber(key);
  } else if (/^[+\-*/]$/.test(key)) {
    handleOperator(key);
  } else if (key === "Enter" || key === "=") {
    evaluateExpression();
  } else if (key === "Backspace") {
    handleAction("backspace");
  } else if (key === "Escape") {
    handleAction("clear");
  }
});

updateDisplay();
